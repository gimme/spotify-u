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
  let limit = 100;

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
  queryParams?: object
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
          headers: { Authorization: "Bearer " + accessToken },
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
