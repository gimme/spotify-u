import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { getSong, getPlaylists } from "../spotifyAPI/SpotifyAccess";
import logo from "../logo.svg";
import "../App.scss";
import { Button } from "@material-ui/core";
import VirtualizedList from "../components/VirtualizedList";

function MainPage(props) {
  const [count, setCount] = useState(1);
  const [song, setSong] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [items, setItems] = useState([{ name: "AAA" }, { name: "BBB" }]);

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
    <div>
      <VirtualizedList
        items={items}
        onItemSelected={(item, index) =>
          console.log("Selected item:", item.name)
        }
      />

      <img src={logo} className="App-logo" alt="logo" />
      <p />

      <Button
        color="primary"
        variant="outlined"
        onClick={setCurrentlyPlayingSong}
      >
        Show Current Song
      </Button>

      <h1>{song ? song : "-No song is currently playing-"}</h1>

      <Button color="primary" variant="outlined" onClick={increment}>
        Increment (test)
      </Button>

      <h1>
        {count} <br />
        {playlist ? playlist : "-"}
      </h1>
    </div>
  );
}

export default withRouter(MainPage);
