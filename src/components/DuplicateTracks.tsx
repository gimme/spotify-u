import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import Track, { getAddedAtDate } from "../interfaces/Track";
import CheckboxList from "../components/utils/CheckboxList";
import TrackListItem from "./TrackListItem";
import LoadingButton from "./LoadingButton";
import { removeSongsFromPlaylist } from "../spotifyAPI/SpotifyAccess";
import Playlist from "../interfaces/Playlist";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
    },
    header: {
      color: theme.palette.primary.main,
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(2),
      height: theme.spacing(6),
    },
    button: {
      margin: theme.spacing(1),
      marginBottom: theme.spacing(10),
    },
    list: {
      position: "relative",
      //overflow: "auto",
      //maxHeight: 600,
      width: "100%",
    },
    checkedListItem: {
      backgroundColor: theme.palette.secondary.main + "08",
    },
  })
);

/**
 * Returns the index of the newest added track from each duplicate set.
 *
 * @param duplicates The sets of duplicates to check
 */
function getWorstDuplicates(duplicates: Track[][]): number[] {
  let result: number[] = [];

  let i = 0;
  for (const tracks of duplicates) {
    let bestDuplicateIndex = -1;
    let bestAddedAtTime: number = Date.now();

    for (const track of tracks) {
      let addedAtTime = getAddedAtDate(track).getTime();

      if (bestDuplicateIndex < 0) {
        bestDuplicateIndex = i;
        bestAddedAtTime = addedAtTime;
      } else if (addedAtTime < bestAddedAtTime) {
        result.push(bestDuplicateIndex);
        bestDuplicateIndex = i;
        bestAddedAtTime = addedAtTime;
      } else {
        result.push(i);
      }
      i++;
    }
  }

  return result;
}

/**
 * Returns a one-dimensional expanded version of a 2D list.
 *
 * @param list The list to get a 1D version of
 */
function convert2DListTo1D<T>(list: T[][]): T[] {
  let newList: T[] = [];
  for (const sublist of list) {
    newList.push(...sublist);
  }
  return newList;
}

interface Props {
  playlist: Playlist;
  duplicates: Track[][];
  duplicatesSnapshotId: string;
}

/**
 * List of duplicate tracks that can be removed.
 */
const DuplicateTracks: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [tracks, setTracks] = useState<Track[]>(
    convert2DListTo1D(props.duplicates)
  );
  const [checked, setChecked] = useState<number[]>(
    getWorstDuplicates(props.duplicates)
  );
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const isChecked = (index: number): boolean => {
    return checked.indexOf(index) !== -1;
  };

  const handleToggle = (index: number) => {
    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(index);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const deleteChecked = () => {
    setDeleteLoading(true);

    let tracksToRemove: Track[] = [];
    let newTracks: Track[] = [];

    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i];

      if (isChecked(i)) {
        tracksToRemove.push(track);
      } else {
        newTracks.push(track);
      }
    }

    removeSongsFromPlaylist(
      props.playlist,
      tracksToRemove,
      props.duplicatesSnapshotId
    ).then((success) => {
      setDeleteLoading(false);

      if (success) {
        setChecked([]);
        setTracks(newTracks);
      }
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h2>Found {props.duplicates.length} songs with duplicates:</h2>
      </div>
      <Divider />
      <div className={classes.list}>
        <CheckboxList<Track>
          items={tracks}
          isChecked={(index) => isChecked(index)}
          handleToggle={handleToggle}
          listItemClassName={(index) =>
            isChecked(index) ? classes.checkedListItem : ""
          }
          getContent={(item) => <TrackListItem track={item} />}
        />
      </div>
      <div>
        <LoadingButton
          color="secondary"
          variant="contained"
          className={classes.button}
          startIcon={<Delete />}
          disabled={checked.length === 0}
          loadingCondition={deleteLoading}
          onClick={() => deleteChecked()}
        >
          Delete ({checked.length})
        </LoadingButton>
      </div>
    </div>
  );
};

export default DuplicateTracks;
