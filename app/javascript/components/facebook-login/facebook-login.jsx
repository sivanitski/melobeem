import propTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { FacebookContext, LoginButton } from "react-facebook";

import { createFbAPI } from "../../api";
import UserContext from "../../helpers/user-context";

const FacebookLogin = ({ title, classes, handleLogin }) => {
  const { setUser } = useContext(UserContext);
  const facebookContext = useContext(FacebookContext);
  const [appId, setAppId] = useState("");
  useEffect(() => {
    if (facebookContext.isReady) {
      setAppId(facebookContext.api.options.appId);
    }
  }, [facebookContext.isReady]);
  const api = createFbAPI();

  const handleResponse = (data) => {
    // { cookie: true } for FB.init does not work. We'll have to set the required cookie manually
    document.cookie = `fbsr_${appId}=${data.tokenDetail.signedRequest}`;

    api.get(``).then((res) => {
      setUser(res.data.user);
      if (handleLogin) {
        handleLogin();
      }
    });
  };

  const handleError = (error) => {
    console.log(error);
  };

  return (
    <LoginButton onCompleted={handleResponse} onError={handleError}>
      <span className={`button button--facebook ${classes}`}>{title}</span>
    </LoginButton>
  );
};

FacebookLogin.propTypes = {
  title: propTypes.string.isRequired,
  classes: propTypes.string.isRequired,
  handleLogin: propTypes.func,
};

export default FacebookLogin;
