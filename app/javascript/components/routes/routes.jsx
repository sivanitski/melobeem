import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import ChildContext from "../../helpers/child-context";
import { Entry } from "../entry";
import { Leaderboard } from "../leaderboard";
import { Profile } from "../profile";
import { ProfileUser } from "../profile-user";
import { SignUp } from "../sign-up";
import { Vote } from "../vote";
import { Voters } from "../voters";

const Routes = () => {
  const { currentChild } = useContext(ChildContext);
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
        <Route exact path={"/profile"}>
          <ProfileUser />
        </Route>
        <Route exact path={"/profile/:id"}>
          <Profile />
        </Route>
        <Route exact path={"/sign-up"}>
          {currentChild ? (
            <Redirect to={`/entry/${currentChild.id}`} />
          ) : (
            <SignUp />
          )}
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
