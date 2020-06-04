import React from "react";
import MainPage from "./Pages/MainPage";
import LoadingPage from "./Pages/LoadingPage";
import {
  validateAccessToken,
  startAccessTokenRefreshInterval,
} from "./SpotifyAPI/AuthService";
import { Router, Switch, Route } from "react-router-dom";
import "./App.css";
import history from "./utils/history";

function App() {
  validateAccessToken();
  startAccessTokenRefreshInterval();

  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/loading" exact component={LoadingPage} />
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
