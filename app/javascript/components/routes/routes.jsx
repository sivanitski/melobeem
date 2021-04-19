import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import UserContext from "../../helpers/user-context";
import { CompetitorsSearch } from "../competitors-search";
import { Entry } from "../entry";
import { Leaderboard } from "../leaderboard";
import { LeaderboardInfo } from "../leaderboard-info";
import { LeaderboardWinners } from "../leaderboard-winners";
import { Level } from "../level";
import { Prizes } from "../prizes";
import { Profile } from "../profile";
import { ProfileNotification } from "../profile-notification";
import { ProfileRoute } from "../profile-route";
import { ProfileSetting } from "../profile-setting";
import { SignUp } from "../sign-up";
import { SpinnerPage } from "../spinner-page";
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
        <Route exact path="/competition-info">
          <LeaderboardInfo />
        </Route>
        <Route exact path="/competition-info/winners">
          <LeaderboardWinners />
        </Route>
        <Route exact path="/competition-info/prizes">
          <Prizes />
        </Route>
        <Route exact path="/search">
          <CompetitorsSearch />
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
        <Route exact path={"/profile/notifications"}>
          <ProfileNotification />
        </Route>
        <Route exact path={"/profile/setting"}>
          {user ? <ProfileSetting /> : <Redirect to="/" />}
        </Route>
        <Route exact path={"/profile/:id"}>
          <Profile />
        </Route>
        <Route exact path={"/level"}>
          <Level />
        </Route>
        <Route exact path="/spinner">
          <SpinnerPage />
        </Route>
        <Route exact path={"/sign-up"}>
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
