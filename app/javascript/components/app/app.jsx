import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Entry } from "../entry";
import { Leaderboard } from "../leaderboard";
import { Vote } from "../vote";

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
      </Switch>
    </Router>
  );
};

export default App;
