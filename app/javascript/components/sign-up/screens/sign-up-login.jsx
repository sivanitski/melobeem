import propTypes from "prop-types";
import React from "react";

import { FacebookLoginComponent } from "../../facebook-login";

const SignUpLogin = ({ imagePreviewUrl, childId, handlePhotoSave }) => {
  const trackEvent = (event, eventName) => {
    let json = JSON.stringify({
      tk: "riuerunb3UIBBINIn2in23ibbYB@UYBBoi4oon12b124",
      event: {
        site: "melobeem",
        event: event,
        event_name: eventName,
        user_token: localStorage.getItem("tk"),
      },
    });

    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
    };

    fetch("http://localhost:3031/events", requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));
  };

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
          <div onClick={() => trackEvent("click", "enter-continue-via-fb")}>
            <FacebookLoginComponent
              title="Continue via Facebook"
              classes="form__button form-preview__button entering_signup_with_fb"
              state={"entry_create"}
            />
          </div>
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
