import React, { useState } from "react";
import "../App.scss";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";

interface Item {
  name: string;
}

interface RowProps<T> {
  index: number;
  style: React.CSSProperties | undefined;
  data: {
    selectedIndex: number;
    onItemClick: (item: T, index: number) => void;
    items: T[];
    getText(t: T): string;
  };
}

function renderRow<T>(props: RowProps<T>) {
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
      <ListItemText
        primaryTypographyProps={{ noWrap: true }}
        primary={props.data.getText(item)}
      />
    </ListItem>
  );
}

interface Props<T> {
  height: number;
  itemSize: number;
  items: T[];
  getText(t: T): string;
  onItemSelected: (item: T, index: number) => void;
  onItemClick?: (item: T, index: number) => void;
}

function VirtualizedList<T>(props: Props<T>) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const onItemClick = (item: T, index: number) => {
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
    getText: props.getText,
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
}

export default VirtualizedList;
