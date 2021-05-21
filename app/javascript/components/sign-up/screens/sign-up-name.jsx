import classNames from "classnames";
import propTypes from "prop-types";
import React, { useContext } from "react";
import { Redirect } from "react-router";

import ChildContext from "../../../helpers/child-context";

const SignUpName = ({
  name,
  handleChange,
  goNext,
  isButtonDisabled,
  isFormNotEmpty,
}) => {
  const { currentChild } = useContext(ChildContext);

  if (currentChild?.currentCompetition) {
    return <Redirect to={`/entry/${currentChild.id}`} />;
  }

  const handleClick = () => {
    if (!isButtonDisabled) {
      goNext();
    }
  };

  const formButtonClasses = classNames("button form__button", {
    "form__button--disabled": isButtonDisabled,
    "form__button--small-margin": isFormNotEmpty,
  });

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
        className={formButtonClasses}
        disabled={isButtonDisabled}
        onClick={handleClick}
      >
        Next
      </button>
    </div>
  );
};

SignUpName.propTypes = {
  name: propTypes.string,
  handleChange: propTypes.func.isRequired,
  goNext: propTypes.func.isRequired,
  isButtonDisabled: propTypes.bool.isRequireds,
  isFormNotEmpty: propTypes.bool.isRequired,
};

export default SignUpName;
