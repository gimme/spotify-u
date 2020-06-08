export default interface Playlist {
  name: string;
  id: string;
  images: Image[];
  owner: Owner;
}

interface Image {
  height: number;
  width: number;
  url: string;
}

interface Owner {
  id: string;
}
