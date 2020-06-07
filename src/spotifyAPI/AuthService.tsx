import queryString from "query-string";
import Cookies from "universal-cookie";
import history, { consumeSearchParams } from "../utils/history";

let accessTokenRefreshInterval = 1; // Minutes
let minDurationBeforeRefresh = 15; // Minutes
let expirationTime = 60; // Minutes

const overrideUseProductionBackend = true;
const backend_uri =
  process.env.NODE_ENV === "production" || overrideUseProductionBackend
    ? "https://spotify-u-backend.herokuapp.com"
    : "http://localhost:8888";
let authentication_uri = backend_uri + "/login";
let refresh_token_uri = backend_uri + "/refresh_token";

let accessTokenKey = "access_token";
let refreshTokenKey = "refresh_token";
let recentRefreshKey = "recently_refreshed_access_token";

const cookies = new Cookies();

/**
 * Starts an task to refresh the Spotify access token every 10 minutes;
 */
export const startAccessTokenRefreshInterval = (): void => {
  refreshAccessToken();
  window.setInterval(() => {
    refreshAccessToken();
  }, accessTokenRefreshInterval * 60 * 1000);
};

/**
 * Fetches a new access token from Spotify.
 */
export const validateAccessToken = (): void => {
  fetchAccessToken();
};

/**
 * Returns a promise of an access token if one is found, otherwise generates a new one from Spotify.
 *
 * Access token search order:
 * 1. Cookie
 * 2. Parse from address field
 * 3. Generate new from Spotify
 */
export const fetchAccessToken = (): Promise<string> | null => {
  // Get from cookie
  let accessToken: string = cookies.get(accessTokenKey);
  if (accessToken !== undefined) {
    return Promise.resolve(accessToken);
  }

  // Parse from address field
  let parsed = consumeAccessTokenParams();
  accessToken = parsed.access_token;
  if (!isNullOrEmpty(accessToken)) {
    // Add new cookie with the parsed access token
    updateTokenCookies(accessToken, parsed.refresh_token);
    return Promise.resolve(accessToken);
  }

  // Generate new from Spotify
  generateNewAccessTokenFromSpotify();
  return null;
};

/**
 * Generate new access token from Spotify.
 */
export const invalidateAccessToken = (): void => {
  cookies.remove(accessTokenKey);
  generateNewAccessTokenFromSpotify();
};

/**
 * Refreshes the access token by passing the refresh token to the backend.
 * Returns a promise of with the refreshed access token (the same access token
 * that the refresh token was originally generated for).
 */
export const refreshAccessToken = (): void => {
  // Don't refresh again if done recently
  if (cookies.get(recentRefreshKey) !== undefined) return;

  let refreshToken = cookies.get(refreshTokenKey);
  if (refreshToken === undefined) return;

  console.log("Refreshing access token...");

  fetch(refresh_token_uri + "?refresh_token=" + refreshToken)
    .then((response) => response.json())
    .then((data) => {
      console.log("Refreshed access token");

      let accessToken = data.access_token;
      updateTokenCookies(accessToken, refreshToken);
    });
};

/**
 * Generates a new access token by redirecting to Spotify's authentication page.
 */
function generateNewAccessTokenFromSpotify(): void {
  history.push("/loading");
  window.location.replace(authentication_uri);
}

interface AccessTokenParams {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

/**
 * Returns the access token parsed from the address field.
 */
function consumeAccessTokenParams(): AccessTokenParams {
  let { access_token, refresh_token, expires_in, ...rest } = queryString.parse(
    window.location.search
  );
  consumeSearchParams(queryString.stringify(rest));
  // Remove the hash that is sometimes appended on the callback
  window.location.hash = window.location.hash.replace("_=_", "");
  return {
    access_token: access_token as string,
    expires_in: (expires_in as unknown) as number,
    refresh_token: refresh_token as string,
  };
}

/**
 * Updates the access/refresh token values stored in the cookies.
 *
 * @param accessToken The access token value to set
 * @param refreshToken The refresh token value to set
 */
function updateTokenCookies(accessToken: string, refreshToken: string): void {
  cookies.set(accessTokenKey, accessToken, {
    path: "/",
    maxAge: expirationTime * 60,
  });
  cookies.set(refreshTokenKey, refreshToken, {
    path: "/",
    maxAge: expirationTime * 60,
  });
  cookies.set(recentRefreshKey, "", {
    path: "/",
    maxAge: minDurationBeforeRefresh * 60,
  });
}

/**
 * Returns if the specified string is undefined, null or empty.
 *
 * @param string The string to check
 */
function isNullOrEmpty(string: string): boolean {
  return string === undefined || string === null || string === "";
}
