import classNames from "classnames";
import propTypes from "prop-types";
import React, { useContext } from "react";
import { useHistory, withRouter } from "react-router";

import { api } from "../../../api";
import ChildContext from "../../../helpers/child-context";

const SignUpName = ({
  name,
  handleChange,
  goNext,
  isButtonDisabled,
  isFormNotEmpty,
  childId,
}) => {
  const history = useHistory();
  const { setCurrentChild } = useContext(ChildContext);

  const handleClick = async () => {
    if (childId) {
      const {
        data: { entry },
      } = await api.put(`/users/entries/${childId}`, {
        entry: {
          name,
        },
      });
      setCurrentChild(entry);
      history.push(`/entry/${childId}`);
    }

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
        {childId ? "Save" : "Next"}
      </button>
    </div>
  );
};

SignUpName.propTypes = {
  name: propTypes.string,
  handleChange: propTypes.func.isRequired,
  goNext: propTypes.func.isRequired,
  isButtonDisabled: propTypes.bool.isRequired,
  isFormNotEmpty: propTypes.bool.isRequired,
  childId: propTypes.string,
};

export default withRouter(SignUpName);
