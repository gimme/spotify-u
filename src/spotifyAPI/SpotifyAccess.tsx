import { fetchAccessToken, invalidateAccessToken } from "./AuthService";
import queryString from "query-string";
import Playlist from "../interfaces/Playlist";
import Track from "../interfaces/Track";

/**
 * Returns the user ID of the current user.
 */
export const getUserId = (): Promise<string | null> => {
  return fetchFromSpotifyAPI("me").then((data) => {
    if (!data) return null;
    return data.id;
  });
};

/**
 * Returns the currently playing song, or null.
 */
export const getSong = (): Promise<string | null> => {
  return fetchFromSpotifyAPI("me/player/currently-playing").then((data) => {
    if (!data || !data.item) return null;
    return data.item.name;
  });
};

export const getPlaylist = (playlistId: string): Promise<Playlist | null> => {
  return fetchFromSpotifyAPI(`playlists/${playlistId}`).then((data) => {
    if (!data) return null;
    return data;
  });
};

/**
 * Returns all tracks from the specified playlist.
 *
 * @param playlistId The playlist to get the tracks of
 */
export const getTracks = (playlist: Playlist): Promise<Track[] | null> => {
  return appendTracksFromOffset(playlist, 0, []);
};

/**
 * Appends all tracks in the specified playlist, starting from the specified offset, to the specified tracks array.
 *
 * @param playlist The playlist to get the tracks of
 * @param offset The offset to start from
 * @param tracks The array to append the tracks to
 */
function appendTracksFromOffset(
  playlist: Playlist,
  offset: number,
  tracks: Track[]
): Promise<Track[] | null> {
  const limit = 100;

  return fetchFromSpotifyAPI(`playlists/${playlist.id}/tracks`, {
    limit: limit,
    offset: offset,
  }).then((data: TracksResponse | null) => {
    if (!data) return null;

    tracks = tracks.concat(data.items);

    if (!data.next) return Promise.resolve(tracks);
    return appendTracksFromOffset(playlist, offset + limit, tracks);
  });
}

/**
 * Returns a list of booleans representing if each track is liked by the user.
 *
 * @param tracks The tracks to check if liked
 */
export const checkLikedTracks = (
  tracks: Track[]
): Promise<boolean[] | null> => {
  return appendCheckLikedSongs([], tracks);
};

/**
 * Appends liked track check results to the specified liked array.
 *
 * @param liked The array to append the results to
 * @param tracks The tracks to check
 */
function appendCheckLikedSongs(
  liked: boolean[],
  tracks: Track[]
): Promise<boolean[] | null> {
  const limit = 50;

  if (tracks.length === 0) return Promise.resolve(liked);

  let ids = "";
  let leftoverTracks: Track[] = [];
  let count = 0;
  for (const track of tracks) {
    if (count < limit) {
      if (ids.length !== 0) ids = ids + ",";
      ids = ids + track.track.id;
    } else leftoverTracks.push(track);
    count++;
  }

  return fetchFromSpotifyAPI("me/tracks/contains", {
    ids: ids,
  }).then((data: boolean[] | null) => {
    if (!data) return null;

    liked = liked.concat(data);

    if (leftoverTracks.length === 0) return Promise.resolve(liked);
    return appendCheckLikedSongs(liked, leftoverTracks);
  });
}

export const removeSongsFromPlaylist = (
  playlist: Playlist,
  tracksToRemove: Track[],
  snapshotId: string
): Promise<boolean> => {
  const limit = 100;
  let tracks = [];

  let leftoverTracks: Track[] = [];
  let count = 0;
  for (const track of tracksToRemove) {
    count++;
    if (count > limit) {
      leftoverTracks.push(track);
      continue;
    }
    if (!track.position) {
      console.error("Missing track position");
      continue;
    }

    tracks.push({
      uri: track.track.uri,
      positions: [track.position],
    });
  }

  return fetchFromSpotifyAPI(
    `playlists/${playlist.id}/tracks`,
    undefined,
    "DELETE",
    {
      tracks: tracks,
      snapshot_id: snapshotId,
    }
  ).then((data) => {
    if (!data) return false;
    if (leftoverTracks.length === 0) return true;
    return removeSongsFromPlaylist(playlist, leftoverTracks, data.snapshot_id);
  });
};

/**
 * The response data when fetching tracks.
 */
interface TracksResponse {
  items: Track[];
  next: string;
}

/**
 * Returns a list of the playlists owned or followed by the Spotify user.
 *
 * @param limit The maximum number of playlists to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param offset The index of the first playlist to return. Default: 0 (the first object).
 * Maximum offset: 100.000. Use with limit to get the next set of playlists.
 */
export const getPlaylists = (
  limit?: number,
  offset?: number
): Promise<{ items: Playlist[] } | null> => {
  return fetchFromSpotifyAPI("me/playlists", {
    limit: limit,
    offset: offset,
  }).then((data) => {
    if (!data) return null;
    return data;
  });
};

function fetchFromSpotifyAPI(
  path: string,
  queryParams?: object,
  method?: "GET" | "POST" | "DELETE",
  body?: object
): Promise<any | null> {
  let promise = fetchAccessToken();
  if (promise === null) return Promise.resolve(null);

  return promise
    .then((accessToken) => {
      return fetch(
        "https://api.spotify.com/v1/" +
          path +
          (queryParams ? "?" + queryString.stringify(queryParams) : ""),
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
          method: method,
          body: JSON.stringify(body),
        }
      );
    })
    .then(processResponse);
}

function processResponse(response: {
  status: any;
  json: () => any;
}): Promise<any | null> {
  const statusCode = response.status;
  if (statusCode === 204) return Promise.resolve(null);
  const data = response.json();
  return Promise.all([statusCode, data]).then(([statusCode, data]) => {
    if (statusCode === 401) {
      // Invalid access token
      invalidateAccessToken();
      return null;
    }

    return statusCode === 200 ? data : null;
  });
}
