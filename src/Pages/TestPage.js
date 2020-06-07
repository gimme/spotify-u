import React from "react";
import "../App.scss";
import { Button } from "@material-ui/core";

function TestPage() {
  return (
    <div>
      <h1>Test Page</h1>
      <Button color="primary" variant="outlined">
        Hello World1
      </Button>
      <Button color="secondary" variant="outlined">
        Hello World2
      </Button>
    </div>
  );
}

export default TestPage;
