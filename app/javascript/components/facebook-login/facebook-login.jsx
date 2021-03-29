import axios from "axios";
import propTypes from "prop-types";
import React, { useContext } from "react";
import { LoginButton } from "react-facebook";

import UserContext from "../../helpers/user-context";
import { getLoginPayload } from "../../helpers/utils";

const FacebookLogin = ({ title, classes, handleLogin }) => {
  const { setUser } = useContext(UserContext);

  const handleResponse = async (data) => {
    const { code } = getLoginPayload(data);

    const res = await axios.get(`/users/auth/facebook/callback`, {
      params: { code },
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
    <LoginButton
      onCompleted={handleResponse}
      onError={handleError}
      reauthorize={true}
    >
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
