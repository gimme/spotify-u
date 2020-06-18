import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import DelayedCircularProgress from "./DelayedCircularProgress";

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    position: "absolute",
  },
}));

interface Props {
  loadingCondition: boolean;
  color?: "inherit" | "primary" | "secondary" | "default";
  variant?: "text" | "outlined" | "contained";
  startIcon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

/**
 * A button that displays a circular progress indicator (and is disabled) when the specified loadingCondition is true.
 */
export default function LoadingButton(props: Props) {
  const classes = useStyles();
  return (
    <Button
      color={props.color}
      variant={props.variant}
      startIcon={props.startIcon}
      disabled={props.loadingCondition || props.disabled}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
      {props.loadingCondition && (
        <DelayedCircularProgress
          className={classes.buttonProgress}
          size={24}
          wait={300}
        />
      )}
    </Button>
  );
}
