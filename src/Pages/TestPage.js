import React, { useState } from "react";
import "../App.scss";
import { Button } from "@material-ui/core";
import VirtualizedList from "../components/VirtualizedList";

function TestPage() {
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
        items={items}
        onItemSelected={(item, index) =>
          console.log("Selected item:", item.name)
        }
      />
    </div>
  );
}

export default TestPage;
