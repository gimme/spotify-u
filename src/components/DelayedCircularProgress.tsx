import React from "react";
import Delayed from "./utils/Delayed";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function DelayedCircularProgress() {
  return (
    <Delayed wait={500}>
      <CircularProgress />
    </Delayed>
  );
}
