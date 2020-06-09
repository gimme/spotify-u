import React, { useState, useEffect } from "react";
import { getPlaylists, getUserId } from "../spotifyAPI/SpotifyAccess";
import "../App.scss";
import InfiniteLoaderList from "../components/InfiniteLoaderList";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Playlist from "../interfaces/Playlist";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: theme.spacing(22),
    margin: theme.spacing(3),
    backgroundColor: theme.palette.grey[900],
  },
}));

interface Props {
  onPlaylistSelected?: (playlist: Playlist, index: number) => void;
}

const Playlists: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [playlists, setPlaylists] = useState<(Playlist | null)[]>([]);
  const [skippedPlaylists, setSkippedPlaylists] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    getUserId().then((userId) => {
      setUserId(userId);
      setPlaylists((playlists) => [...playlists, null]);
    });
  }, []);

  const loadPlaylists = (index: number): Promise<any> => {
    if (!userId) {
      setPlaylists((playlists) => playlists.filter((item) => !!item));
      return Promise.resolve();
    }

    return getPlaylists(40, index + skippedPlaylists).then((data) => {
      if (!data || data.items.length === 0) {
        setPlaylists((playlists) => playlists.filter((item) => !!item));
        return;
      }

      let filteredData = data.items.filter(
        (playlist) => playlist.owner.id === userId
      );

      setSkippedPlaylists(
        skippedPlaylists + data.items.length - filteredData.length
      );
      setPlaylists((playlists) =>
        playlists.filter((item) => !!item).concat([...filteredData, null])
      );
    });
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <InfiniteLoaderList
        height={600}
        itemSize={46}
        items={playlists}
        getText={(playlist: Playlist | null) =>
          playlist ? playlist.name : "Loading..."
        }
        loadItems={loadPlaylists}
        onItemSelected={props.onPlaylistSelected}
      />
    </Paper>
  );
};

export default Playlists;
