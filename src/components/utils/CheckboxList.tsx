import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
  })
);

interface Props<T> {
  items: T[];
  isChecked: (index: number) => boolean;
  handleToggle: (index: number) => void;
  getContent: (item: T) => JSX.Element;
  listItemClassName?: (index: number) => string;
}

export default function CheckboxList<T>(props: Props<T>) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {props.items.map((item, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem
            key={index}
            role={undefined}
            dense
            button
            divider
            className={
              props.listItemClassName && props.listItemClassName(index)
            }
            onClick={() => props.handleToggle(index)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={props.isChecked(index)}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            {props.getContent(item)}
          </ListItem>
        );
      })}
    </List>
  );
}
