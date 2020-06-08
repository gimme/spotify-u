export default interface Playlist {
  name: string;
  id: string;
  images: Image[];
}

interface Image {
  height: number;
  width: number;
  url: string;
}
