import Track from "../interfaces/Track";
import { compareTwoStrings } from "string-similarity";

/**
 * Looks through the specified list of tracks and returns any duplicates.
 *
 * @param tracks The tracks to look through
 */
export const findDuplicateTracks = (tracks: Track[]) => {
  // Create a copy of the array sorted by artist
  let sortedTracks: (Track | null)[] = tracks.slice().sort(compareTracks);
  let duplicates: Track[] = [];

  // Loop through the whole list
  for (let i = 0; i < sortedTracks.length; i++) {
    let currentTrack = sortedTracks[i];
    // If already checked, go to the next track
    if (!currentTrack) continue;

    // Store the current song and artist
    let currentSong = currentTrack.track.name;
    let currentArtist = currentTrack.track.artists[0].name;

    let isFirstDuplicate: boolean = true;
    // Loop through all subsequent tracks by the current artist
    for (let j = i + 1; j < sortedTracks.length; j++) {
      let t = sortedTracks[j];
      // If already checked, go to the next track
      if (!t) continue;
      // If reached the next artist, break
      if (t.track.artists[0].name !== currentArtist) break;

      // If found duplicate, add it to the results list
      if (isSameSong(t.track.name, currentSong)) {
        // Make sure the current track is added once
        if (isFirstDuplicate) {
          isFirstDuplicate = false;
          duplicates.push(currentTrack);
        }
        duplicates.push(t);
        // Remove track from list to avoid checking it again
        sortedTracks[j] = null;
      }
    }
  }
  return duplicates;
};

/**
 * Compare-function for sorting tracks by artist, then title.
 */
function compareTracks(track1: Track, track2: Track): number {
  let locale = "en";
  let options = { sensitivity: "base" };
  return (
    2 *
      track1.track.artists[0].name.localeCompare(
        track2.track.artists[0].name,
        locale,
        options
      ) +
    1 * track1.track.name.localeCompare(track2.track.name, locale, options)
  );
}

/**
 * Returns if the specified song names are similar enough to be interpreted as the same track.
 */
function isSameSong(song1: string, song2: string) {
  return compareTwoStrings(song1, song2) >= 0.8;
}
