import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import UserContext from "../../helpers/user-context";
import { Award } from "../award";
import { CompetitorsSearch } from "../competitors-search";
import { Delete } from "../delete";
import DeleteConfirm from "../delete/screens/delete-confirm";
import { Entry } from "../entry";
import EditEntry from "../entry/blocks/entry-edit";
import { EntryTakePrize } from "../entry-prize";
import { Leaderboard } from "../leaderboard";
import { LeaderboardInfo } from "../leaderboard-info";
import { LeaderboardWinners } from "../leaderboard-winners";
import { Level } from "../level";
import { PreviousWinners } from "../previous-winners";
import { Prizes } from "../prizes";
import { Profile } from "../profile";
import NextCompetition from "../profile/blocks/profile-next-competition";
import { ProfileNotification } from "../profile/profile-notification";
import { ProfileRoute } from "../profile/profile-route";
import { ProfileSetting } from "../profile/profile-setting";
import Privacy from "../profile/profile-setting/screens/privacy";
import Rules from "../profile/profile-setting/screens/rules";
import Terms from "../profile/profile-setting/screens/terms";
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
        <Route exact path="/previous-winners/:id">
          <PreviousWinners />
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
        <Route exact path={"/awards/:id"}>
          <Award />
        </Route>
        <Route exact path={"/entry/:id/vote"}>
          <Vote />
        </Route>
        <Route exact path={"/entry/:id/voters"}>
          <Voters />
        </Route>
        <Route exact path={"/entry/:id/prize"}>
          <EntryTakePrize />
        </Route>
        <Route exact path={"/next-competition"}>
          <NextCompetition />
        </Route>
        <Route exact path={"/entry/:id/edit"}>
          <EditEntry />
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
        <Route exact path={"/profile/setting/rules"}>
          {user ? <Rules /> : <Redirect to="/" />}
        </Route>
        <Route exact path={"/profile/setting/privacy"}>
          {user ? <Privacy /> : <Redirect to="/" />}
        </Route>
        <Route exact path={"/profile/setting/terms-and-conditions"}>
          {user ? <Terms /> : <Redirect to="/" />}
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
        <Route exact path={"/delete"}>
          <Delete />
        </Route>
        <Route exact path={"/delete/confirm"}>
          <DeleteConfirm />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
