import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { FacebookLogin } from "../../facebook-login";
import { FacebookShare } from "../../facebook-share";

const PopupButton = ({ type, linkId }) => {
  if (type === "vote") {
    return (
      <FacebookShare id={linkId} classes="popup__button background-purple">
        Share on Facebook
      </FacebookShare>
    );
  }

  if (type.includes("login")) {
    return (
      <FacebookLogin
        title="Log in with Facebook"
        classes="popup__button button--facebook"
      />
    );
  }

  if (type.includes("enter")) {
    return (
      <Link className="button popup__button" to="/sign-up">
        Enter competition
      </Link>
    );
  }

  return null;
};

PopupButton.propTypes = {
  type: propTypes.string.isRequired,
  linkId: propTypes.number,
};

export default PopupButton;
