import React, { useState, useEffect } from "react";
import { getSong, getPlaylists } from "../spotifyAPI/SpotifyAccess";
import logo from "../logo.svg";
import "../App.scss";
import { Button } from "@material-ui/core";
import VirtualizedList from "../components/VirtualizedList";

const MainPage: React.FC = () => {
  const [count, setCount] = useState<number>(1);
  const [song, setSong] = useState<string | null>(null);
  const [playlist, setPlaylist] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([{ text: "AAA" }, { text: "BBB" }]);

  useEffect(() => {
    setCurrentlyPlayingSong();
    setCurrentPlaylist(0);
  }, []);

  const increment = (): void => {
    setCount(count + 1);
    setCurrentPlaylist(count);
  };

  const setCurrentPlaylist = (index: number): void => {
    getPlaylists(1, index).then((data) => {
      setPlaylist(data ? data.items[0].name : null);
    });
  };

  const setCurrentlyPlayingSong = (): void => {
    getSong().then((result) => {
      setSong(result);
    });
  };

  return (
    <div>
      <VirtualizedList
        items={items}
        onItemSelected={(item, index) =>
          console.log("Selected item:", item.text)
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
};

export default MainPage;
