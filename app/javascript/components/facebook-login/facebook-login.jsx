import propTypes from "prop-types";
import React, { useContext } from "react";
import FacebookLogin from "react-facebook-login";
import ReactPixel from "react-facebook-pixel";
import { useHistory } from "react-router";

import { api, userAPI } from "../../api";
import ChildContext from "../../helpers/child-context";
import UserContext from "../../helpers/user-context";
import { getLoginPayload } from "../../helpers/utils";

const FacebookLoginComponent = ({
  title,
  classes,
  handleLoginWhileSignUp,
  type,
  onClick,
  state,
  linkId,
}) => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const { setCurrentChild } = useContext(ChildContext);

  const getCurrentEntryWhenUserLogin = async () => {
    const {
      data: { entry },
    } = await api.get("/entries/current");
    setCurrentChild(entry);
  };

  const handleResponse = async (data) => {
    const { code } = getLoginPayload(data);

    const res = await userAPI.get(`/auth/facebook/callback`, {
      params: { code },
    });
    setUser(res.data.user);

    if (handleLoginWhileSignUp) {
      handleLoginWhileSignUp();
    } else {
      getCurrentEntryWhenUserLogin();
    }

    if (type === "login-to-vote") {
      history.push(`/entry/${linkId}/vote`);
    }

    dataLayer.push({ event: "user-login" });
    ReactPixel.trackCustom("login", { id: res.data.user.id });
  };

  const handleError = (error) => {
    console.error(error);
  };

  const fbScope = "public_profile, email";

  return (
    <FacebookLogin
      appId={process.env.FACEBOOK_APP_ID}
      autoLoad={true}
      scope={fbScope}
      cookie={true}
      xfbml={true}
      isMobile={true}
      disableMobileRedirect={false}
      onFailure={handleError}
      onClick={onClick}
      state={state}
      redirectUri={"https://melobeem.com/users/auth/facebook/callback"}
      cssClass={`button button--facebook ${classes}`}
      callback={handleResponse}
      auth_type={"reauthenticate"}
      render={(renderProps) => (
        <button onClick={renderProps.onClick}>{title}</button>
      )}
    />
  );
};

FacebookLoginComponent.propTypes = {
  title: propTypes.string.isRequired,
  classes: propTypes.string.isRequired,
  handleLoginWhileSignUp: propTypes.func,
  type: propTypes.string,
  linkId: propTypes.number,
  onClick: propTypes.func,
  state: propTypes.string.isRequired,
};

export default FacebookLoginComponent;
