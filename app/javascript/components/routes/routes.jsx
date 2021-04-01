import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import UserContext from "../../helpers/user-context";
import { Entry } from "../entry";
import { Leaderboard } from "../leaderboard";
import { Profile } from "../profile";
import { ProfileRoute } from "../profile-route";
import { ProfileSetting } from "../profile-setting";
import { SignUp } from "../sign-up";
import { Vote } from "../vote";
import { Voters } from "../voters";

const Routes = () => {
  const { user } = useContext(UserContext);
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
          <ProfileRoute />
        </Route>
        <Route exact path={"/profile/setting"}>
          {user ? <ProfileSetting /> : <Redirect to="/" />}
        </Route>
        <Route exact path={"/profile/:id"}>
          <Profile />
        </Route>
        <Route exact path={"/sign-up"}>
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
