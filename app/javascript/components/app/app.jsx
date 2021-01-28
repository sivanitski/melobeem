import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Leaderboard } from "../leaderboard";
import TestPage from "../test-page/test-page";

const App = () => {
  // return <Leaderboard />;
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Leaderboard />
        </Route>
        <Route exact path={"/test-page"}>
          <TestPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
