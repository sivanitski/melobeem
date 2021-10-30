import propTypes from "prop-types";
import React from "react";

import HalloweenBackground from "../../../images/halloween_text_background.svg";

const PopupText = ({ type, name, parentName }) => {
  const renderText = () => {
    if (type === "vote") {
      return `Let ${parentName} know you voted and help ${name} get more votes.`;
    }

    if (type === "login-to-vote") {
      return "Please Login with Facebook to Vote for this Baby";
    }

    if (type.includes("sale")) {
      return "50% off for all Votes packages";
    }

    if (type.includes("spinner")) {
      return "You can get free daily Spinner when you enter competition";
    }

    if (type.includes("level")) {
      return " You can progress through the levels when you enter competition";
    }

    return null;
  };

  if (type === "halloween_sale") {
    return (
      <div className="popup__text_container">
        <HalloweenBackground />
        <div className="popup__text text-grey">
          50% off for all Votes packages
        </div>
      </div>
    );
  } else {
    return <div className="popup__text text-grey">{renderText()}</div>;
  }
};

PopupText.propTypes = {
  type: propTypes.string.isRequired,
  name: propTypes.string,
  parentName: propTypes.string,
};

export default PopupText;
