import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRequest } from "ahooks";
import React, { useEffect, useState } from "react";
import ReactPixel from "react-facebook-pixel";
import { hotjar } from "react-hotjar";

import { api } from "../../api";
import ChildContext from "../../helpers/child-context";
import UserContext from "../../helpers/user-context";
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

  const { data: currentChildData, run: requestCurrentChild } = useRequest(
    getCurrentChildren,
    {
      formatResult: (res) => res.data.entry,
    }
  );

  const { data: userData } = useRequest(getCurrentUser, {
    formatResult: (res) => res.data.user,
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);

      if (!currentChildData) {
        requestCurrentChild();
      }

      hotjar.identify(userData.id, { userData });
    }

    if (currentChildData) {
      setCurrentChild(currentChildData);
    }
  }, [userData, currentChildData]);

  useEffect(() => {
    const options = {
      autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
      debug: false, // enable logs
    };
    ReactPixel.init(
      201545765230454, //add  pizel perfect ID
      // advancedMatching,
      options
    );
  }, []);

  const valueUser = { user, setUser };
  const valueCurrentChild = {
    currentChild,
    setCurrentChild,
  };

  // if (userLoading || childLoading) {
  //   return <Loader />;
  // }

  // const advancedMatching = { em: 'some@email.com' }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching

  hotjar.initialize(2628633, 6);

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
