import propTypes from "prop-types";
import React, { useContext } from "react";
import { LoginButton } from "react-facebook";

import { userAPI } from "../../api";
import UserContext from "../../helpers/user-context";
import { getLoginPayload } from "../../helpers/utils";

const FacebookLogin = ({
  title,
  classes,
  handleLoginWhileSignUp,
  getCurrentEntry,
}) => {
  const { setUser } = useContext(UserContext);

  const handleResponse = async (data) => {
    const { code } = getLoginPayload(data);

    const res = await userAPI.get(`/auth/facebook/callback`, {
      params: { code },
    });
    setUser(res.data.user);

    if (handleLoginWhileSignUp) {
      handleLoginWhileSignUp();
    } else {
      getCurrentEntry();
    }
  };

  const handleError = (error) => {
    console.log(error);
  };

  const fbScope = "public_profile, email";

  return (
    <LoginButton
      onCompleted={handleResponse}
      onError={handleError}
      reauthorize={true}
      scope={fbScope}
    >
      <span className={`button button--facebook ${classes}`}>{title}</span>
    </LoginButton>
  );
};

FacebookLogin.propTypes = {
  title: propTypes.string.isRequired,
  classes: propTypes.string.isRequired,
  handleLoginWhileSignUp: propTypes.func,
  getCurrentEntry: propTypes.func,
};

export default FacebookLogin;
