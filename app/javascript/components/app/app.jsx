import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Entry } from "../entry";
import { Leaderboard } from "../leaderboard";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Leaderboard />
        </Route>
        <Route exact path={"/entry/:id"}>
          <Entry />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
