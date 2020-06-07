import React, { useState } from "react";
import "../App.scss";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { FixedSizeList } from "react-window";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.grey[900],
  },
}));

interface Item {
  text: string;
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
      <ListItemText primary={item.text} />
    </ListItem>
  );
}

interface Props {
  items: Item[];
  onItemSelected: (item: Item, index: number) => void;
  onItemClick?: (item: Item, index: number) => void;
}

function VirtualizedList(props: Props) {
  const classes = useStyles();
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
    <div className={classes.root}>
      <FixedSizeList
        itemData={data}
        height={400}
        width={300}
        itemSize={46}
        itemCount={data.items.length}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
}

export default VirtualizedList;
