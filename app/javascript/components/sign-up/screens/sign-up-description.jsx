import propTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router";

import SignUpImage from "../../../images/sign-up-description.png";

const SignUpDescription = ({ goNext }) => {
  const handleClick = async () => {
    goNext();
  };

  return (
    <div className="sign-up-description-container">
      <div className="form__image">
        <img
          className="img-responsive header-image"
          src={SignUpImage}
          srcSet={`${SignUpImage} 2x`}
          alt="Cute Baby Enter"
        />
      </div>
      <div className="form__title-main">Welcome</div>
      <div className="form__title-secondary">
        <p>
          to the cutest baby photo competition
          <br />
          Enter to win lots
          <br />
          of prizes every month!
        </p>
      </div>

      <div className="button-container">
        <button
          className="button form__button"
          id="entering_from_ads"
          onClick={handleClick}
        >
          Get started
        </button>
      </div>
    </div>
  );
};

SignUpDescription.propTypes = {
  goNext: propTypes.func.isRequired,
};

export default withRouter(SignUpDescription);
