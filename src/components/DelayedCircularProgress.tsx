import React from "react";
import Delayed from "./utils/Delayed";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  className?: string;
  size?: number;
  wait?: number;
}

export default function DelayedCircularProgress(props: Props) {
  return (
    <Delayed wait={props.wait ? props.wait : 500}>
      <CircularProgress size={props.size} className={props.className} />
    </Delayed>
  );
}
