import { fetchAccessToken, invalidateAccessToken } from "./AuthService";

/**
 * Returns the currently playing song, or null.
 */
export const getSong = () => {
  let promise = fetchAccessToken();
  if (promise === null) return Promise.resolve(null);

  return promise
    .then((token) => {
      return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: { Authorization: "Bearer " + token },
      });
    })
    .then(processResponse)
    .then((data) => {
      if (!data) return null;
      return data.item.name;
    });
};

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
