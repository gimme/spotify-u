import queryString from "query-string";
import Cookies from "universal-cookie";

var authentication_uri = "https://spotify-u-backend.herokuapp.com/login";
var refresh_token_uri = "https://spotify-u-backend.herokuapp.com/refresh_token";
var accessTokenKey = "access_token";
var refreshTokenKey = "refresh_token";

const cookies = new Cookies();

/**
 * Fetches a new access token from Spotify.
 */
export const validateAccessToken = () => {
  accessToken();
};

/**
 * Returns a promise of an access token if one is found, otherwise fetches a new one from Spotify.
 *
 * Access token search order:
 * 1. Cookie
 * 2. Parse from address field
 * 3. Fetch new from Spotify wtih refresh token
 * 4. Fetch new from Spotify
 */
export const accessToken = () => {
  console.log("accessToken1");
  let accessToken = cookies.get(accessTokenKey);
  if (!isNullOrEmpty(accessToken)) {
    return Promise.resolve(accessToken);
  }
  console.log("accessToken2");

  let parsed = parseAccessToken();
  accessToken = parsed.access_token;
  if (!isNullOrEmpty(accessToken)) {
    // Add new cookie with the parsed access token
    cookies.set(accessTokenKey, accessToken, {
      path: "/",
      maxAge: parsed.expires_in,
    });
    cookies.set(refreshTokenKey, parsed.refresh_token, { path: "/" });
    return Promise.resolve(accessToken);
  }
  console.log("accessToken3");

  let promise = refreshTokenToGetAccessToken();
  if (promise !== null) return promise;

  console.log("accessToken4");
  fetchNewAccessTokenFromSpotify();
  return null;
};

/**
 * Invalidates the cookie containing the access token.
 */
export const invalidateAccessTokenCookie = () => {
  cookies.remove(accessTokenKey);
};

function refreshTokenToGetAccessToken() {
  let token = cookies.get(refreshTokenKey);
  if (token === undefined) return null;
  console.log("refreshTokenToGetAccessToken...");

  return fetch(refresh_token_uri + "?refresh_token=" + token)
    .then((response) => response.json())
    .then((data) => {
      invalidateAccessTokenCookie();
      cookies.set(accessTokenKey, data.access_token);
      return data.access_token;
    });
}

function isNullOrEmpty(string) {
  return string === undefined || string === null || string === "";
}

/**
 * Returns the access token parsed from the address field.
 */
function parseAccessToken() {
  let parsed = queryString.parse(window.location.search);
  return {
    access_token: parsed.access_token,
    expires_in: parsed.expires_in,
    refresh_token: parsed.refresh_token,
  };
}

function fetchNewAccessTokenFromSpotify() {
  window.location.replace(authentication_uri);
}
