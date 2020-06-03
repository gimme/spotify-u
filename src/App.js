import React from "react";
import MainPage from "./MainPage";
import { validateAccessToken } from "./SpotifyAPI/AuthService";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route
            path="/auth"
            exact
            component={() => {
              validateAccessToken();
              return null;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
