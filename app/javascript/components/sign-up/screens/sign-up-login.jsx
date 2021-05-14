import propTypes from "prop-types";
import React from "react";

import { FacebookLogin } from "../../facebook-login";

const SignUpLogin = ({ imagePreviewUrl, handleLoginWhileSignUp }) => {
  return (
    <div className="form-preview">
      <div className="form__progress progress">
        <div className="progress__line progress__line--bright" />
        <div className="progress__line progress__line--bright" />
        <div className="progress__line progress__line--bright" />
      </div>
      <div className="form-preview__img">
        <img src={imagePreviewUrl} />
      </div>
      <div className="form-preview__title headline--medium">
        You’re almost there !
      </div>
      <FacebookLogin
        title="Continue via Facebook"
        classes="form__button form-preview__button"
        handleLoginWhileSignUp={handleLoginWhileSignUp}
      />
    </div>
  );
};

SignUpLogin.propTypes = {
  imagePreviewUrl: propTypes.string.isRequired,
  handleLoginWhileSignUp: propTypes.func.isRequired,
};

export default SignUpLogin;
