import React, { useState } from "react";
import "../App.scss";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { FixedSizeList } from "react-window";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 400,
    maxWidth: 300,
    //backgroundColor: theme.palette.background.paper,
    backgroundColor: theme.palette.grey.A400, //"#ffffff08",
  },
}));

function renderRow(props) {
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

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

function VirtualizedList(props) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const onItemClick = (item, index) => {
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
