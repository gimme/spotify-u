import React, { useState } from "react";
import "../App.scss";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";

interface Item {
  name: string;
}

interface RowProps {
  index: number;
  style: React.CSSProperties | undefined;
  data: {
    selectedIndex: number;
    onItemClick: (item: Item, index: number) => void;
    items: Item[];
  };
}

function renderRow(props: RowProps) {
  const { index, style } = props;
  const item = props.data.items[index];

  return (
    <ListItem
      button
      style={style}
      key={index}
      selected={props.data.selectedIndex === index}
      onClick={() => {
        if (props.data.onItemClick) props.data.onItemClick(item, index);
      }}
    >
      <ListItemText primary={item.name} />
    </ListItem>
  );
}

interface Props {
  height: number;
  itemSize: number;
  items: Item[];
  onItemSelected: (item: Item, index: number) => void;
  onItemClick?: (item: Item, index: number) => void;
}

const VirtualizedList: React.FC<Props> = (props) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const onItemClick = (item: Item, index: number) => {
    let alreadySelected = index === selectedIndex;
    setSelectedIndex(index);
    if (props.onItemClick) props.onItemClick(item, index);
    if (!alreadySelected && props.onItemSelected)
      props.onItemSelected(item, index);
  };

  const data = {
    selectedIndex: selectedIndex,
    onItemClick: onItemClick,
    items: props.items,
  };

  return (
    <div>
      <FixedSizeList
        itemData={data}
        height={props.height}
        width={"100%"}
        itemSize={props.itemSize}
        itemCount={data.items.length}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
};

export default VirtualizedList;
