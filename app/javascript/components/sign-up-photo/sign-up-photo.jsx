import "./style.less";

import propTypes from "prop-types";
import React from "react";

import signUpImg from "../../images/sign-up.png";
import signUpImg2x from "../../images/sign-up@2x.png";

const SignUpPhoto = ({ handleChange, name }) => {
  return (
    <div className="form form-img">
      <div className="form__progress progress">
        <div className="progress__line progress__line--bright" />
        <div className="progress__line progress__line--bright" />
        <div className="progress__line" />
      </div>
      <div className="form-img__upload">
        <img
          src={signUpImg}
          srcSet={`${signUpImg2x} 2x`}
          alt="Sign up with photo"
          className="form-img__picture"
        />
        <div className="form-img__title headline--medium">Add a photo</div>
        <div className="form-img__text text-grey">
          Choose the cutest {name} photo you want to show to your friends
        </div>
      </div>
      <div
        className="form-img__wrapper form__wrapper form__button"
        onChange={handleChange}
      >
        <input
          name="file"
          type="file"
          id="form-img__file"
          className="input form-img__file"
        />
        <label
          htmlFor="form-img__file"
          className="button form-img__file-button"
        >
          Add photo
        </label>
      </div>
    </div>
  );
};

SignUpPhoto.propTypes = {
  handleChange: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
};

export default SignUpPhoto;
