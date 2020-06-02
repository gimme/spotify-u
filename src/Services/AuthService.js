import React, { Component } from "react";

var querystring = require("querystring");
var cookieParser = require("cookie-parser");

var client_id = "26e104ca9c8e456b872151ca0c8f4e9e"; // Your client id
var client_secret = "28be63b4c6c94c37a3dc97180ec3c956"; // Your secret
var redirect_uri = "https://gimme0.github.io/SpotifyU/callback/"; // Your redirect uri
var scope = "user-read-private user-read-email user-read-playback-state";

export const authenticate = () => {
  let url =
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
    });

  // your application requests authorization
  window.location.replace(url);
};

function AuthService() {
  return;
}

export default AuthService;
