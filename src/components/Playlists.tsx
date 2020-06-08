import React, { useState } from "react";
import VirtualizedList from "../components/VirtualizedList";

interface Props {
  playlists: { name: string }[];
}

const Playlists: React.FC<Props> = (props) => {
  return (
    <div>
      <VirtualizedList
        height={400}
        itemSize={46}
        items={props.playlists}
        onItemSelected={(item, index) =>
          console.log("Selected item:", item.name)
        }
      />
    </div>
  );
};

export default Playlists;
