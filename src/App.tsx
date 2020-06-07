import React from "react";
import MainPage from "./pages/MainPage";
import TestPage from "./pages/TestPage";
import LoadingPage from "./pages/LoadingPage";
import {
  validateAccessToken,
  startAccessTokenRefreshInterval,
} from "./spotifyAPI/AuthService";
import { Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import history from "./utils/history";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import darkTheme from "./themes/darkTheme";

function App() {
  validateAccessToken();
  startAccessTokenRefreshInterval();

  return (
    <div className="outerWrap">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router history={history}>
          <div className="App">
            <Switch>
              <Route path="/" exact component={MainPage} />
              <Route path="/test" exact component={TestPage} />
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
      </ThemeProvider>
    </div>
  );
}

export default App;
