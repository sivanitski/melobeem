import propTypes from "prop-types";
import React from "react";

import { FacebookLoginComponent } from "../../facebook-login";

const SignUpLogin = ({ imagePreviewUrl, childId, handlePhotoSave }) => {
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
      {childId ? (
        <button
          className="button form__button form__button--save"
          onClick={handlePhotoSave}
        >
          Save
        </button>
      ) : (
        <>
          <div className="form-preview__title headline--medium">
            You’re almost there !
          </div>
          <FacebookLoginComponent
            title="Continue via Facebook"
            classes="form__button form-preview__button entering_signup_with_fb"
            state={"entry_create"}
          />
        </>
      )}
    </div>
  );
};

SignUpLogin.propTypes = {
  imagePreviewUrl: propTypes.string.isRequired,
  childId: propTypes.string,
  handlePhotoSave: propTypes.func.isRequired,
};

export default SignUpLogin;
