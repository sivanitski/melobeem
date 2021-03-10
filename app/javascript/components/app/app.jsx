import { useRequest } from "ahooks";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { createAPI } from "../../api";
import UserContext from "../../helpers/user-context";
import { Entry } from "../entry";
import { Leaderboard } from "../leaderboard";
import { Profile } from "../profile";
import { ProfileUser } from "../profile-user";
import { SignUp } from "../sign-up";
import { Vote } from "../vote";
import { Voters } from "../voters";

const App = () => {
  const api = createAPI();
  const [user, setUser] = useState(null);
  const value = { user, setUser };

  const getCurrentUser = () => {
    return api.get("/users/current");
  };

  const { data } = useRequest(getCurrentUser, {
    formatResult: (res) => res.data.user,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

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
          <Route exact path={"/profile"}>
            <ProfileUser />
          </Route>
          <Route exact path={"/profile/:id"}>
            <Profile />
          </Route>
          <Route exact path={"/sign-up"}>
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
