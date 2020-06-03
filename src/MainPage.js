import React, { useState, useEffect } from "react";
import { getSong } from "./SpotifyAPI/SpotifyAccess";
import logo from "./logo.svg";
import "./App.css";
import { validateAccessToken } from "./SpotifyAPI/AuthService";

function MainPage() {
  const [count, setCount] = useState(0);
  const [song, setSong] = useState(null);

  useEffect(() => {
    validateAccessToken();
  }, []);

  const increment = () => {
    setCount(count + 1);
  };

  const getCurrentlyPlayingSong = () => {
    getSong().then((result) => {
      setSong(result);
    });
  };

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <p />

      <button onClick={getCurrentlyPlayingSong}>Show Current Song</button>

      <h1>{song ? song : "-No song is currently playing-"}</h1>

      <button onClick={increment}>Increment</button>

      <h1>{count}</h1>
    </div>
  );
}

export default MainPage;
