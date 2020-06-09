import React, { useState, useEffect } from "react";
import { getSong } from "../spotifyAPI/SpotifyAccess";
import logo from "../logo.svg";
import "../App.scss";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Playlist from "../interfaces/Playlist";
import Playlists from "../components/Playlists";

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
}));

const MainPage: React.FC = () => {
  const classes = useStyles();
  const [song, setSong] = useState<string | null>(null);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
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
        <Playlists
          onPlaylistSelected={(playlist, index) => {
            setPlaylist(playlist);
          }}
        />
      </div>

      <div className={classes.app}>
        {playlist ? (
          <div>
            <div className={classes.header}>
              {playlist ? (
                <div>
                  <img
                    height={300}
                    src={playlist.images[0].url}
                    alt={"Playlist Cover"}
                  />
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
      </div>
      <div className={classes.sideBar} />
    </div>
  );
};

export default MainPage;
