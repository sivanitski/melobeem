import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import UserContext from "../../helpers/user-context";
import { Entry } from "../entry";
import { Leaderboard } from "../leaderboard";
import { Profile } from "../profile";
import { Vote } from "../vote";
import { Voters } from "../voters";

const App = () => {
  const [user, setUser] = useState(null);
  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
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
          <Route exact path={"/profile/:id"}>
            <Profile />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
