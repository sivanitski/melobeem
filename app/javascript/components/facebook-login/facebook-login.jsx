import propTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { FacebookContext, LoginButton } from "react-facebook";

import { createAPI, createFbAPI } from "../../api";
import ChildContext from "../../helpers/child-context";
import UserContext from "../../helpers/user-context";
import axios from 'axios'

const FacebookLogin = ({ title, classes, handleLogin }) => {
  const { setUser } = useContext(UserContext);
  const { setCurrentChild } = useContext(ChildContext);
  const facebookContext = useContext(FacebookContext);
  const [appId, setAppId] = useState("");
  useEffect(() => {
    if (facebookContext.isReady) {
      setAppId(facebookContext.api.options.appId);
    }
  }, [facebookContext.isReady]);
  // const apiFb = createFbAPI();
  const api = createAPI();

  const handleResponse = async (evn) => {
    // console.log(evn)
    evn.preventDefault();
    // { cookie: true } for FB.init does not work. We'll have to set the required cookie manually

    FB.login(function(res) {
      if (res.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        document.cookie = `fbsr_${appId}=${res.authResponse.signedRequest}`;
        console.log(res)
        const resAuth = axios.get(`/users/auth/facebook/callback`).then(function(resAuth) {
          console.log('data fetched')
          console.log(resAuth)
          setUser(resAuth.data.user);
          if (handleLogin) {
            handleLogin();
          }
        });

        // const child = await api.get(`/entries/current`);
        // console.log(child)
        // setCurrentChild(child.data.entry);

        // FB.api('/me', function(response) {
        //   console.log('Good to see you, ' + response.name + '.');
        // });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    },{scope: 'email'});
  };

  const handleError = (error) => {
    console.log(error);
  };

  return (
    <a onClick={handleResponse}>
      <span className={`button button--facebook ${classes}`}>{title}</span>
    </a>
  );
};

FacebookLogin.propTypes = {
  title: propTypes.string.isRequired,
  classes: propTypes.string.isRequired,
  handleLogin: propTypes.func,
};

export default FacebookLogin;
