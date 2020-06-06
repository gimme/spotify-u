import { fetchAccessToken, invalidateAccessToken } from "./AuthService";
import queryString from "query-string";

/**
 * Returns the currently playing song, or null.
 */
export const getSong = () => {
  return fetchFromSpotifyAPI("me/player/currently-playing").then((data) => {
    if (!data) return null;
    return data.item.name;
  });
};

export const getPlaylists = (limit, offset) => {
  return fetchFromSpotifyAPI("me/playlists", {
    limit: limit,
    offset: offset,
  }).then((data) => {
    if (!data) return null;
    return data;
  });
};

function fetchFromSpotifyAPI(path, queryParams) {
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

function processResponse(response) {
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
