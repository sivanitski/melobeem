import propTypes from "prop-types";
import React from "react";

import PrizeIconLevel from "../../../images/prize-icon-level.svg";

const UnlockNotification = ({ level, prize }) => {
  return (
    <div className="notification-item">
      <div className="notification-item__img">
        <PrizeIconLevel />
      </div>

      <div className="notification-item__text text-grey">
        Level {level} completed
        <span className="notification-item__value text-black">
          {` ${prize} `}
        </span>
        awarded
      </div>
    </div>
  );
};

UnlockNotification.propTypes = {
  level: propTypes.number.isRequired,
  prize: propTypes.string.isRequired,
};

export default UnlockNotification;
