import {
  invalidateAccessTokenCookie,
  validateAccessToken,
  accessToken,
} from "./AuthService";

/**
 * Returns the currently playing song, or null.
 */
export const getSong = () => {
  let promise = accessToken();
  if (promise === null) return null;

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
  const data = response.json();
  return Promise.all([statusCode, data])
    .then(([statusCode, data]) => {
      if (statusCode === 401) {
        // Invalid access token
        invalidateAccessTokenCookie();
        validateAccessToken();
      }

      return statusCode === 200 ? data : null;
    })
    .catch((error) => {});
}
