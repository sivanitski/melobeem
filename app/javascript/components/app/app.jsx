import { useRequest } from "ahooks";
import React, { useEffect, useState } from "react";

import { createAPI } from "../../api";
import ChildContext from "../../helpers/child-context";
import UserContext from "../../helpers/user-context";
import { Loading } from "../loading";
import { Routes } from "../routes";

const App = () => {
  const api = createAPI();
  const [user, setUser] = useState(null);
  const [currentChild, setCurrentChild] = useState(null);

  const getCurrentUser = () => {
    return api.get("/users/current");
  };

  const getCurrentChildren = () => {
    return api.get("/entries/current");
  };

  const { data: userData, loading } = useRequest(getCurrentUser, {
    formatResult: (res) => res.data.user,
    throwOnError: true,
  });

  const { data: currentChildData, run: requestCurrentBaby } = useRequest(
    getCurrentChildren,
    {
      formatResult: (res) => res.data.entry,
      throwOnError: true,
    }
  );

  useEffect(() => {
    if (userData && !currentChildData) {
      setUser(userData);
      requestCurrentBaby();
    }

    if (currentChildData) {
      setCurrentChild(currentChildData);
    }
  }, [userData, currentChildData]);

  if (loading) {
    return <Loading />;
  }

  const valueUser = { user, setUser };
  const valueCurrentChild = { currentChild, setCurrentChild };

  return (
    <UserContext.Provider value={valueUser}>
      <ChildContext.Provider value={valueCurrentChild}>
        <Routes />
      </ChildContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
