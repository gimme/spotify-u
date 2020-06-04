import React from "react";
import logo from "../logo.svg";
import "../App.css";

function LoadingPage() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Loading...</h1>
    </div>
  );
}

export default LoadingPage;
