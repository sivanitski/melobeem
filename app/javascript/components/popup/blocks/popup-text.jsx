import propTypes from "prop-types";
import React from "react";

const PopupText = ({ type, name }) => {
  const renderText = () => {
    if (type === "vote") {
      return `Every Facebook post may make ${name} closer to the wining point!`;
    }

    if (type === "login-to-vote") {
      return "Please Login with Facebook to Vote for this Baby";
    }

    if (type.includes("spinner")) {
      return "You can get free daily Spinner when you enter competition";
    }

    if (type.includes("level")) {
      return " You can progress through the levels when you enter competition";
    }

    return null;
  };

  return <div className="popup__text text-grey">{renderText()}</div>;
};

PopupText.propTypes = {
  type: propTypes.string.isRequired,
  name: propTypes.string,
};

export default PopupText;
