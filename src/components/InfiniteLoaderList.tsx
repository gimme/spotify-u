import React from "react";
import VirtualizedList from "./VirtualizedList";
import InfiniteLoader from "react-window-infinite-loader";

const loadingItems: (boolean | undefined)[] = [];

interface Props<T> {
  height: number;
  itemSize: number;
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  items: T[];
  getText: (item: T) => string;
  loadNextPage: (index: number) => Promise<any>;
  onItemSelected?: (item: T, index: number) => void;
  onItemClick?: (item: T, index: number) => void;
}

function InfiniteLoaderList<T>(props: Props<T>) {
  //const isItemLoaded = (index: number) => !!props.items[index];

  /*const loadMoreItems = (
    startIndex: number,
    stopIndex: number
  ): Promise<any> => {
    if (loadingItems[startIndex]) return Promise.resolve();
    loadingItems[startIndex] = true;
    return props.loadItems(startIndex);
  };*/

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = props.hasNextPage
    ? props.items.length + 1
    : props.items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = props.isNextPageLoading
    ? () => Promise.resolve()
    : props.loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) =>
    !props.hasNextPage || index < props.items.length;

  function getText(item: T): string {
    return props.getText(item);
  }

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <VirtualizedList
          isItemLoaded={isItemLoaded}
          onItemsRendered={onItemsRendered}
          reff={ref}
          height={props.height}
          itemSize={props.itemSize}
          items={props.items}
          itemCount={itemCount}
          getText={getText}
          onItemSelected={props.onItemSelected}
          onItemClick={props.onItemClick}
        />
      )}
    </InfiniteLoader>
  );
}

export default InfiniteLoaderList;
