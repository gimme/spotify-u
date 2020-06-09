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
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [skippedPlaylists, setSkippedPlaylists] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  useEffect(() => {
    getUserId().then((userId) => {
      setUserId(userId);
    });
  }, []);

  const loadMorePlaylists = (index: number): Promise<any> => {
    setIsNextPageLoading(true);
    console.log("LOADING MORE PLAYLISTS");

    return new Promise((resolve) =>
      setTimeout(() => {
        setIsNextPageLoading(false);

        if (index >= 100) {
          setHasNextPage(false);
          return;
        }

        let arr: Playlist[] = [];
        for (let i = 0; i < 30; i++) {
          arr[i] = {
            name: "LOADED " + (index + i),
            id: "1",
            images: [{ height: 1, width: 1, url: "" }],
            owner: { id: "1" },
          };
        }
        setPlaylists((playlists) => playlists.concat(arr));

        resolve();
      }, 4000)
    );
    return Promise.resolve();
    if (!userId) {
      //setPlaylists((playlists) => playlists.filter((item) => !!item));
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
        playlists.filter((item) => !!item).concat(filteredData)
      );
    });
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <InfiniteLoaderList
        hasNextPage={hasNextPage}
        isNextPageLoading={isNextPageLoading}
        height={600}
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
