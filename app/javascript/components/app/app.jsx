import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Entry } from "../entry";
import { Leaderboard } from "../leaderboard";
import { Vote } from "../vote";
import { Voters } from "../voters";

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
        <Route exact path={"/entry/:id/vote"}>
          <Vote />
        </Route>
        <Route exact path={"/entry/:id/voters"}>
          <Voters />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
