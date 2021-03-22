import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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

  const { data: userData, loading: userLoading } = useRequest(getCurrentUser, {
    formatResult: (res) => res.data.user,
    throwOnError: true,
  });

  const {
    data: currentChildData,
    run: requestCurrentBaby,
    loading: childLoading,
  } = useRequest(getCurrentChildren, {
    formatResult: (res) => res.data.entry,
    throwOnError: true,
  });

  useEffect(() => {
    if (userData && !currentChildData) {
      setUser(userData);
      requestCurrentBaby();
    }

    if (currentChildData) {
      setCurrentChild(currentChildData);
    }
  }, [userData, currentChildData]);

  const valueUser = { user, setUser };
  const valueCurrentChild = { currentChild, setCurrentChild };

  if (childLoading || userLoading) {
    return <Loading />;
  }

  const stripePromise = loadStripe(
    "pk_test_crNp0aHBZcBsGatP9KRqk7w800UBHkAwP6"
  );

  return (
    <UserContext.Provider value={valueUser}>
      <ChildContext.Provider value={valueCurrentChild}>
        <Elements stripe={stripePromise}>
          <Routes />
        </Elements>
      </ChildContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
