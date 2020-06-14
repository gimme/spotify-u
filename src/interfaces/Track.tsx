export default interface Track {
  track: Info;
}

interface Info {
  name: string;
  id: string;
  artists: Artist[];
}

interface Artist {
  name: string;
  id: string;
}
