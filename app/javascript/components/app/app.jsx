import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRequest } from "ahooks";
import React, { useEffect, useState } from "react";

import { api } from "../../api";
import ChildContext from "../../helpers/child-context";
import UserContext from "../../helpers/user-context";
import Loader from "../animation/loader";
import { Routes } from "../routes";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const App = () => {
  const [user, setUser] = useState(null);
  const [currentChild, setCurrentChild] = useState(null);

  const getCurrentUser = () => {
    return api.get("/users/current");
  };

  const getCurrentChildren = () => {
    return api.get("/entries/current");
  };

  const {
    data: currentChildData,
    run: requestCurrentChild,
    loading: childLoading,
  } = useRequest(getCurrentChildren, {
    formatResult: (res) => res.data.entry,
  });

  const { data: userData, loading: userLoading } = useRequest(getCurrentUser, {
    formatResult: (res) => res.data.user,
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);

      if (!currentChildData) {
        requestCurrentChild();
      }
    }

    if (currentChildData) {
      setCurrentChild(currentChildData);
    }
  }, [userData, currentChildData]);

  const valueUser = { user, setUser };
  const valueCurrentChild = {
    currentChild,
    setCurrentChild,
  };

  if (userLoading || childLoading) {
    return <Loader />;
  }

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
