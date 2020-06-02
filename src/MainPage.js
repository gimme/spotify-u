import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function MainPage() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const sayHello = () => {
    console.log("Authorized!");
  };
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <p />

      <a href="http://localhost:8888">
        <button>Login With Spotify</button>
      </a>

      <button onClick={sayHello}>Authorizee</button>

      <button onClick={increment}>Increment</button>

      <h1>{count}</h1>
    </div>
  );
}

export default MainPage;
