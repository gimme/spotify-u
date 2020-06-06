import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { getSong, getPlaylists } from "../SpotifyAPI/SpotifyAccess";
import logo from "../logo.svg";
import "../App.css";

function MainPage(props) {
  const [count, setCount] = useState(1);
  const [song, setSong] = useState(null);
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    setCurrentlyPlayingSong();
    setCurrentPlaylist();
  }, []);

  const increment = () => {
    setCount(count + 1);
    setCurrentPlaylist(count);
  };

  const setCurrentPlaylist = (index) => {
    getPlaylists(1, index).then((data) => {
      setPlaylist(data.items[0].name);
    });
  };

  const setCurrentlyPlayingSong = () => {
    getSong().then((result) => {
      setSong(result);
    });
  };

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <p />

      <button onClick={setCurrentlyPlayingSong}>Show Current Song</button>

      <h1>{song ? song : "-No song is currently playing-"}</h1>

      <button onClick={increment}>Increment (test)</button>

      <h1>
        {count} <br />
        {playlist ? playlist : "-"}
      </h1>
    </div>
  );
}

export default withRouter(MainPage);
