import React from "react";
import MainPage from "./MainPage";
import { authenticate } from "./Services/AuthService";
import PrivateRoute from "./PrivateRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  browserHistory,
  hashHistory,
} from "react-router-dom";
import "./App.css";

let history =
  process.env.NODE_ENV === "production" ? "browserHistory" : "hashHistory";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL} history={history}>
      <div className="App">
        <Switch>
          <Route path="/home" exact component={MainPage} />
          <Route path="/" exact component={MainPage} />
          <Route
            path="/a"
            exact
            component={() => {
              authenticate();
              return null;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
