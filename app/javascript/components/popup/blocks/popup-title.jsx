import classNames from "classnames";
import propTypes from "prop-types";
import React from "react";

const PopupTitle = ({ type }) => {
  const titleClasses = classNames("popup__title headline", {
    "text-pink": type !== "vote",
    "text-purple": type === "vote",
  });

  const renderTitle = () => {
    if (type === "vote") {
      return "Share";
    }

    if (type === "login-to-vote") {
      return "Welcome!";
    }

    if (type === "regular_sale") {
      return "Sale!";
    }

    if (type === "black_friday_sale") {
      return "Sales";
    }

    if (type.includes("spinner")) {
      return "Enter to spin";
    }

    if (type.includes("level")) {
      return "Enter to use Levels";
    }
  };

  if (type === "black_friday_sale") {
    return (
      <div className="popup__title headline text-black">{renderTitle()}</div>
    );
  }

  return <div className={titleClasses}>{renderTitle()}</div>;
};

PopupTitle.propTypes = {
  type: propTypes.string.isRequired,
};

export default PopupTitle;
