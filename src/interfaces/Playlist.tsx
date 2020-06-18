import Track from "./Track";

export default interface Playlist {
  name: string;
  id: string;
  images: Image[];
  owner: Owner;
  snapshot_id: string;
}

interface Image {
  height: number;
  width: number;
  url: string;
}

interface Owner {
  id: string;
}
