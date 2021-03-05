import "./style.less";

import propTypes from "prop-types";
import React from "react";

const SignUpName = ({ name, handleChange, goNext, isDisabled }) => {
  const handleClick = () => {
    if (!isDisabled) {
      goNext();
    }
  };

  return (
    <div className="form">
      <div className="form__progress progress">
        <div className="progress__line progress__line--bright" />
        <div className="progress__line" />
        <div className="progress__line" />
      </div>
      <div className="headline--medium form__title">
        What is your Baby name?
      </div>
      <div className="form__content">
        <input
          minLength="2"
          name="name"
          value={name}
          onChange={handleChange}
          id="name"
          className="form__input"
          type="text"
        />

        <button
          className={`button form__button
            ${isDisabled ? "form__button--disabled" : ""}`}
          onClick={handleClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

SignUpName.propTypes = {
  name: propTypes.string,
  handleChange: propTypes.func.isRequired,
  goNext: propTypes.func.isRequired,
  isDisabled: propTypes.bool.isRequireds,
};

export default SignUpName;
