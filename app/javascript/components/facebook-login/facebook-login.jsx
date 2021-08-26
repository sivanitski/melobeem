import propTypes from "prop-types";
import React from "react";
import FacebookLogin from "react-facebook-login";

const FacebookLoginComponent = ({ title, classes, onClick, state }) => {
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
      redirectUri={
        process.env.FACEBOOK_CALLBACK_DOMAIN ||
        "https://melobeem.com/users/auth/facebook/callback"
      }
      cssClass={`button button--facebook ${classes}`}
      textButton={title}
    />
  );
};

FacebookLoginComponent.propTypes = {
  title: propTypes.string.isRequired,
  classes: propTypes.string.isRequired,
  onClick: propTypes.func,
  state: propTypes.string.isRequired,
};

export default FacebookLoginComponent;
