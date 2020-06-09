import React from "react";
import VirtualizedList from "./VirtualizedList";
import InfiniteLoader from "react-window-infinite-loader";

const loadingItems: (boolean | undefined)[] = [];

interface Props<T> {
  height: number;
  itemSize: number;
  items: (T | null)[];
  getText: (item: T) => string;
  loadItems: (index: number) => Promise<any>;
  onItemSelected?: (item: T, index: number) => void;
  onItemClick?: (item: T, index: number) => void;
}

function InfiniteLoaderList<T>(props: Props<T>) {
  const isItemLoaded = (index: number) => !!props.items[index];

  const loadMoreItems = (
    startIndex: number,
    stopIndex: number
  ): Promise<any> => {
    if (loadingItems[startIndex]) return Promise.resolve();
    loadingItems[startIndex] = true;
    return props.loadItems(startIndex);
  };

  function getText(item: T | null): string {
    return item ? props.getText(item) : "Loading...";
  }

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={props.items.length}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <VirtualizedList
          onItemsRendered={onItemsRendered}
          reff={ref}
          height={props.height}
          itemSize={props.itemSize}
          items={props.items}
          itemCount={props.items.length}
          getText={getText}
          onItemSelected={props.onItemSelected}
          onItemClick={props.onItemClick}
        />
      )}
    </InfiniteLoader>
  );
}

export default InfiniteLoaderList;
