import React, { useState } from "react";
import "../App.scss";
import { Button } from "@material-ui/core";
import VirtualizedList from "../components/VirtualizedList";

const TestPage: React.FC = () => {
  const [items, setItems] = useState([{ name: "AAA" }, { name: "BBB" }]);

  const addItem = () => {
    setItems((items) => [...items, { name: "CCC" + (items.length + 1) }]);
    console.log("added CCC " + (items.length + 1));
  };

  return (
    <div>
      <h1>Test Page</h1>
      <Button color="primary" variant="outlined" onClick={addItem}>
        Add Item
      </Button>
      <VirtualizedList
        height={400}
        itemSize={46}
        items={items}
        getText={(item: { name: string }) => item.name}
        onItemSelected={(playlist, index) =>
          console.log("Selected item:", playlist.name)
        }
      />
    </div>
  );
};

export default TestPage;
