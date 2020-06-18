import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import Track, { getAddedAtDate } from "../interfaces/Track";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
    liked: {
      width: "3%",
      display: "flex",
      alignItems: "center",
      minWidth: theme.spacing(5),
      paddingRight: theme.spacing(2),
    },
    title: {
      width: "34%",
      minWidth: theme.spacing(20),
      paddingRight: theme.spacing(2),
    },
    artist: {
      width: "25%",
      minWidth: theme.spacing(15),
      paddingRight: theme.spacing(2),
    },
    album: {
      width: "20%",
      minWidth: theme.spacing(15),
      paddingRight: theme.spacing(2),
    },
    addedAt: {
      width: "13%",
      minWidth: theme.spacing(13),
      paddingRight: theme.spacing(2),
    },
    duration: {
      width: "5%",
      minWidth: theme.spacing(5),
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);

/**
 * Formats the artists string.
 * Returns just the artist name if one, otherwise a list of the artists separated with ", ".
 *
 * @param track The track to get the artists from
 */
function formatArtists(track: Track): string {
  let result: string = "";
  for (const artist of track.track.artists) {
    if (result.length !== 0) result = result + ", ";
    result = result + artist.name;
  }
  return result;
}

/**
 * Formats the "added at" date like Spotify does.
 * Shows how many minutes/hours/days ago if recent, otherwise the full date.
 *
 * @param date The date that the track was added at
 */
function formatAddedAt(date: Date): string {
  let seconds = (Date.now() - date.getTime()) / 1000;

  let roundedSeconds = Math.round(seconds);
  if (roundedSeconds === 0) return "just now";
  if (roundedSeconds === 1) return "a second ago";
  if (roundedSeconds < 60) return roundedSeconds + " seconds ago";

  let roundedMinutes = Math.round(seconds / 60);
  if (roundedMinutes === 1) return "a minute ago";
  if (roundedMinutes < 60) return roundedMinutes + " minutes ago";

  let roundedHours = Math.round(seconds / (60 * 60));
  if (roundedHours === 1) return "an hour ago";
  if (roundedHours < 24) return roundedHours + " hours ago";

  let roundedDays = Math.round(seconds / (60 * 60 * 24));
  if (roundedDays === 1) return "a day ago";
  if (roundedDays < 16) return roundedDays + " days ago";

  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
}

/**
 * Formats the song duration.
 *
 * @param durationMs The duration of the song in milliseconds
 */
function formatDuration(durationMs: number): string {
  let durationSec = Math.round(durationMs / 1000);
  let hours = Math.floor(durationSec / (60 * 60));
  let minutes = Math.floor((durationSec - hours * 3600) / 60);
  let seconds = durationSec - hours * 3600 - minutes * 60;

  let minutesString = (hours > 0 && minutes < 10 ? "0" : "") + minutes;
  let secondsString = (seconds < 10 ? "0" : "") + seconds;

  return (hours > 0 ? hours + ":" : "") + minutesString + ":" + secondsString;
}

interface Props {
  track: Track;
}

function TrackListItem(props: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.liked}>
        {props.track.liked === undefined ? null : props.track.liked ? (
          <Favorite fontSize="small" />
        ) : (
          <FavoriteBorder fontSize="small" />
        )}
      </div>
      <div className={classes.title}>
        <Typography noWrap>{props.track.track.name}</Typography>
      </div>
      <div className={classes.artist}>
        <Typography noWrap>{formatArtists(props.track)}</Typography>
      </div>
      <div className={classes.album}>
        <Typography noWrap>{props.track.track.album.name}</Typography>
      </div>
      <div className={classes.addedAt}>
        <Typography noWrap>
          {formatAddedAt(getAddedAtDate(props.track))}
        </Typography>
      </div>
      <div className={classes.duration}>
        <Typography noWrap>
          {formatDuration(props.track.track.duration_ms)}
        </Typography>
      </div>
    </div>
  );
}

export default TrackListItem;
