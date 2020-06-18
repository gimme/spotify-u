import React, { useState, useEffect } from "react";
import {
  getSong,
  getTracks,
  checkLikedTracks,
  getPlaylist,
} from "../spotifyAPI/SpotifyAccess";
import logo from "../logo.svg";
import "../App.scss";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Playlist from "../interfaces/Playlist";
import Track from "../interfaces/Track";
import Playlists from "../components/Playlists";
import { findDuplicateTracks } from "../utils/PlaylistAlgorithms";
import DuplicateTracks from "../components/DuplicateTracks";
import LoadingButton from "../components/LoadingButton";

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
  button: {
    margin: theme.spacing(1),
  },
}));

const MainPage: React.FC = () => {
  const classes = useStyles();
  const [song, setSong] = useState<string | null>(null);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [duplicates, setDuplicates] = useState<Track[][] | null>(null);
  const [duplicatesSnapshotId, setDuplicatesSnapshotId] = useState<
    string | null
  >(null);
  const [findDuplicatesLoading, setFindDuplicatesLoading] = useState<boolean>(
    false
  );

  useEffect(() => {
    setCurrentlyPlayingSong();
  }, []);

  const setCurrentlyPlayingSong = (): void => {
    getSong().then((result) => {
      setSong(result);
    });
  };

  const onClickFindDuplicates = () => {
    if (!playlist) return;

    setFindDuplicatesLoading(true);
    getTracks(playlist).then((data) => {
      if (!data) {
        setFindDuplicatesLoading(false);
        return;
      }
      let tracks = data;

      getPlaylist(playlist.id).then((data: Playlist | null) => {
        if (!data) {
          setFindDuplicatesLoading(false);
          return;
        }

        let snapshotId = data.snapshot_id;

        for (let i = 0; i < tracks.length; i++) {
          tracks[i].position = i;
        }

        let duplicateTracks: Track[][] = findDuplicateTracks(tracks);

        let tracksToCheckIfLiked: Track[] = [];
        for (const duplicateSet of duplicateTracks) {
          for (const t of duplicateSet) {
            tracksToCheckIfLiked.push(t);
          }
        }

        checkLikedTracks(tracksToCheckIfLiked).then((data) => {
          setFindDuplicatesLoading(false);
          if (!data) return;

          for (let i = 0; i < data.length; i++) {
            tracksToCheckIfLiked[i].liked = data[i];
          }

          setDuplicates(null); // Required to see updates after consequtive calls
          setDuplicates(duplicateTracks);
          setDuplicatesSnapshotId(snapshotId);
        });
      });
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.sideBar}>
        <Playlists
          onPlaylistSelected={(playlist, index) => {
            setPlaylist(playlist);
            setDuplicates(null);
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
                className={classes.button}
                onClick={setCurrentlyPlayingSong}
              >
                Show Current Song
              </Button>
              <LoadingButton
                color="primary"
                variant="contained"
                className={classes.button}
                loadingCondition={findDuplicatesLoading}
                onClick={onClickFindDuplicates}
              >
                Find Duplicate Songs
              </LoadingButton>
              <Button
                color="primary"
                variant="outlined"
                className={classes.button}
                onClick={() => console.log(playlist)}
              >
                Print Playlist
              </Button>
              <Button
                color="primary"
                variant="outlined"
                className={classes.button}
                onClick={() =>
                  getTracks(playlist).then((data) => console.log(data))
                }
              >
                Print Tracks
              </Button>

              <h1>{song ? song : "-No song is currently playing-"}</h1>
              <div>
                {duplicates ? (
                  <DuplicateTracks
                    playlist={playlist}
                    duplicates={duplicates}
                    duplicatesSnapshotId={
                      duplicatesSnapshotId
                        ? duplicatesSnapshotId
                        : playlist.snapshot_id
                    }
                  />
                ) : null}
              </div>
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
