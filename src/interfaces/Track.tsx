export default interface Track {
  added_at: string;
  track: Info;
  liked: boolean | undefined;
  position: number | undefined;
}

interface Info {
  name: string;
  id: string;
  artists: Artist[];
  album: Album;
  duration_ms: number;
  uri: string;
}

interface Artist {
  name: string;
  id: string;
}

interface Album {
  name: string;
}

export const getAddedAtDate = (track: Track): Date => {
  return new Date(Date.parse(track.added_at));
};
