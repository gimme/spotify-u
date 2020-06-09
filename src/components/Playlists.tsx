import React, { useState, useEffect } from "react";
import { getPlaylists, getUserId } from "../spotifyAPI/SpotifyAccess";
import "../App.scss";
import InfiniteLoaderList from "./utils/InfiniteLoaderList";
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
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [skippedPlaylists, setSkippedPlaylists] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  useEffect(() => {
    getUserId().then((userId) => {
      loadMorePlaylistsWithUserId(userId, 0);
      setUserId(userId);
    });
  }, []);

  const loadMorePlaylists = (index: number): Promise<any> => {
    return loadMorePlaylistsWithUserId(userId, index);
  };

  const loadMorePlaylistsWithUserId = (
    userId: string | null,
    index: number
  ): Promise<any> => {
    if (!userId) return Promise.resolve();

    setIsNextPageLoading(true);
    let loadAmount = 40;

    return getPlaylists(loadAmount, index + skippedPlaylists).then((data) => {
      setIsNextPageLoading(false);

      if (!data) {
        setHasNextPage(false);
        return;
      }

      if (data.items.length < loadAmount) setHasNextPage(false);

      // Filter out unowned playlists
      let filteredData = data.items.filter(
        (playlist) => playlist.owner.id === userId
      );

      setSkippedPlaylists(
        skippedPlaylists + data.items.length - filteredData.length // Count unowned playlists
      );
      setPlaylists(
        (playlists) => playlists.concat(filteredData) // Append loaded playlists
      );
    });
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <InfiniteLoaderList
        hasNextPage={hasNextPage}
        isNextPageLoading={isNextPageLoading}
        height={784}
        itemSize={46}
        items={playlists}
        getText={(playlist: Playlist) => playlist.name}
        loadNextPage={loadMorePlaylists}
        onItemSelected={props.onPlaylistSelected}
      />
    </Paper>
  );
};

export default Playlists;
