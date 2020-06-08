import React, { useState, useEffect } from "react";
import { getSong, getPlaylists } from "../spotifyAPI/SpotifyAccess";
import logo from "../logo.svg";
import "../App.scss";
import { Button } from "@material-ui/core";
import VirtualizedList from "../components/VirtualizedList";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Playlist from "../interfaces/Playlist";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  app: {
    width: "100%",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    justifyContent: "center",
    paddingTop: theme.spacing(3),
  },
  content: {
    paddingTop: theme.spacing(3),
  },
  sideBar: {
    width: "100%",
    maxWidth: theme.spacing(40),
  },
  playlists: {
    minWidth: theme.spacing(22),
    margin: theme.spacing(3),
    backgroundColor: theme.palette.grey[900],
  },
}));

const MainPage: React.FC = () => {
  const classes = useStyles();
  const [song, setSong] = useState<string | null>(null);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    getPlaylists(20, 0).then((data) => {
      if (!data) return;
      setPlaylists(data.items);
    });
    setCurrentlyPlayingSong();
  }, []);

  const setCurrentlyPlayingSong = (): void => {
    getSong().then((result) => {
      setSong(result);
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.sideBar}>
        <Paper elevation={3} className={classes.playlists}>
          <VirtualizedList
            height={600}
            itemSize={46}
            items={playlists}
            getText={(playlist: Playlist) => playlist.name}
            onItemSelected={(playlist, index) => {
              setPlaylist(playlist);
            }}
          />
        </Paper>
      </div>

      {playlist ? (
        <div className={classes.app}>
          <div className={classes.header}>
            {playlist ? (
              <div>
                <img height={300} src={playlist.images[0].url} />
                <h1>{playlist.name}</h1>
              </div>
            ) : (
              <img src={logo} className="App-logo" alt="logo" />
            )}
            <p />
          </div>

          <Divider variant="middle" />

          <div className={classes.content}>
            <Button
              color="primary"
              variant="outlined"
              onClick={setCurrentlyPlayingSong}
            >
              Show Current Song
            </Button>

            <h1>{song ? song : "-No song is currently playing-"}</h1>
          </div>
        </div>
      ) : (
        <div className={classes.header}>
          <h1>Select a playlist</h1>
        </div>
      )}
      <div className={classes.sideBar} />
    </div>
  );
};

export default MainPage;
