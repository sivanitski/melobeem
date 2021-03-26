import propTypes from "prop-types";
import React, { useContext } from "react";
import { LoginButton } from "react-facebook";

import { createFbAPI } from "../../api";
import UserContext from "../../helpers/user-context";

const FacebookLogin = ({ title, classes, handleLogin }) => {
  const { setUser } = useContext(UserContext);
  const apiFb = createFbAPI();

  const handleResponse = async (data) => {
    const res = await apiFb.post(``, {
      access_token: data.tokenDetail.accessToken,
    });
    setUser(res.data.user);
    if (handleLogin) {
      handleLogin();
    }
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
