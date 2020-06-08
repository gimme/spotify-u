import React, { useState, useEffect } from "react";
import { getSong, getPlaylists } from "../spotifyAPI/SpotifyAccess";
import logo from "../logo.svg";
import "../App.scss";
import { Button } from "@material-ui/core";
import VirtualizedList from "../components/VirtualizedList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  playlists: {
    width: "100%",
    maxWidth: theme.spacing(32),
    backgroundColor: theme.palette.grey[900],
    margin: theme.spacing(3),
  },
}));

interface Playlist {
  name: string;
}

const MainPage: React.FC = () => {
  const classes = useStyles();
  const [count, setCount] = useState<number>(1);
  const [song, setSong] = useState<string | null>(null);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { name: "Playlist 1" },
    { name: "Playlist 2" },
    { name: "Playlist 3" },
    { name: "Playlist 4" },
    { name: "Playlist 5" },
    { name: "Playlist 6" },
    { name: "Playlist 7" },
    { name: "Playlist 8" },
  ]);

  useEffect(() => {
    getPlaylists(10, 20).then((data) => {
      if (!data) return;
      setPlaylists(data.items);
    });
    setCurrentlyPlayingSong();
  }, []);

  const increment = (): void => {
    setCount(count + 1);
  };

  const setCurrentlyPlayingSong = (): void => {
    getSong().then((result) => {
      setSong(result);
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.playlists}>
        <VirtualizedList
          height={600}
          itemSize={46}
          items={playlists}
          onItemSelected={(item, index) => {
            setPlaylist(playlists[index]);
          }}
        />
      </div>

      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <p />

        <Button
          color="primary"
          variant="outlined"
          onClick={setCurrentlyPlayingSong}
        >
          Show Current Song
        </Button>

        <Button color="primary" variant="outlined" onClick={increment}>
          Increment (test)
        </Button>

        <h1>{song ? song : "-No song is currently playing-"}</h1>

        <h1>{playlist ? playlist.name : "-"}</h1>

        <h1>{count}</h1>
      </div>
    </div>
  );
};

export default MainPage;
