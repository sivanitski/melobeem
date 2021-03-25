import propTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { FacebookContext, LoginButton } from "react-facebook";

import { createAPI, createFbAPI } from "../../api";
import ChildContext from "../../helpers/child-context";
import UserContext from "../../helpers/user-context";

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
  const apiFb = createFbAPI();
  const api = createAPI();

  const handleResponse = (data) => {
    console.log(data);
    // debugger;

    // api.get("/users/current)

    // // { cookie: true } for FB.init does not work. We'll have to set the required cookie manually
    // document.cookie = `fbsr_${appId}=${data.tokenDetail.signedRequest}`;

    apiFb.post(``, data);

    // const child = await api.get(`/entries/current`);
    // debugger;

    // console.log(child);

    // setCurrentChild(child.data.entry);
    // setUser(res.data.user);
    // console.log(res.data.user);
    // if (handleLogin) {
    //   handleLogin();
    // }
  };

  const handleError = (error) => {
    console.log(error);
  };

  return (
    <LoginButton
      redirectURI="https://3d297b06dfc3.ngrok.io/users/auth/facebook/callback"
      onCompleted={handleResponse}
      onError={handleError}
    >
      <span className={`button button--facebook ${classes}`}>{title}</span>
    </LoginButton>
    // <div className="button" onClick={handleResponse}>
    //   Login via Facebbok
    // </div>
  );
};

FacebookLogin.propTypes = {
  title: propTypes.string.isRequired,
  classes: propTypes.string.isRequired,
  handleLogin: propTypes.func,
};

export default FacebookLogin;
