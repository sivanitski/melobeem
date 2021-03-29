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

  const { data: userData, loading: userLoading } = useRequest(getCurrentUser, {
    formatResult: (res) => res.data.user,
    throwOnError: true,
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const valueUser = { user, setUser };
  const valueCurrentChild = { currentChild, setCurrentChild };

  if (userLoading) {
    return <Loading />;
  }

  const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

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
