import React, { useState } from "react";
import "../App.scss";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box } from "@material-ui/core";
import Delayed from "./Delayed";

interface RowProps<T> {
  index: number;
  style: React.CSSProperties | undefined;
  data: {
    selectedIndex: number;
    onItemClick: (item: T, index: number) => void;
    items: T[];
    getText: (t: T) => string;
    isLoading?: boolean;
    isItemLoaded?: (index: number) => boolean;
  };
}

function renderRow<T>(props: RowProps<T>) {
  const { index, style } = props;
  const item = props.data.items[index];

  const loaded: boolean =
    !props.data.isItemLoaded || props.data.isItemLoaded(index);

  const loading: boolean = !!props.data.isLoading && props.data.isLoading;

  let content;
  if (loading) {
    content = (
      <ListItem style={{ height: 56 }} key={index}>
        <Box justifyContent="center" width="100%" display="flex">
          <Delayed wait={500}>
            <CircularProgress />
          </Delayed>
        </Box>
      </ListItem>
    );
  } else if (!loaded) {
    content = null;
  } else {
    content = (
      <ListItem
        button
        key={index}
        selected={props.data.selectedIndex === index}
        onClick={() => {
          if (props.data.onItemClick && item)
            props.data.onItemClick(item, index);
        }}
      >
        <ListItemText
          primaryTypographyProps={{ noWrap: true }}
          primary={props.data.getText(item)}
        />
      </ListItem>
    );
  }

  return <div style={style}>{content}</div>;
}

interface Props<T> {
  height: number;
  itemSize: number;
  items: T[];
  getText: (item: T) => string;
  itemCount?: number;
  onItemSelected?: (item: T, index: number) => void;
  onItemClick?: (item: T, index: number) => void;
  onItemsRendered?: any;
  reff?: any;
  isLoading?: boolean;
  isItemLoaded?: (index: number) => boolean;
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
    isLoading: props.isLoading,
    isItemLoaded: props.isItemLoaded,
  };

  return (
    <div>
      <FixedSizeList
        itemData={data}
        height={props.height}
        width={"100%"}
        itemSize={props.itemSize}
        itemCount={props.itemCount ? props.itemCount : data.items.length}
        onItemsRendered={props.onItemsRendered}
        ref={props.reff}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
}

export default VirtualizedList;
