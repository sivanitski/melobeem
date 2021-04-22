import propTypes from "prop-types";
import React from "react";

import PrizeIconLevel from "../../../images/prize-icon-level.svg";
import { definePrizeTitle } from "../../level/screens/prize-parameters";

const UnlockNotification = ({ level, prize }) => {
  return (
    <div className="notification-item">
      <div className="notification-item__img">
        <PrizeIconLevel />
      </div>

      <div className="notification-item__text text-grey">
        Level {level} completed
        <span className="notification-item__value text-black">
          {` ${definePrizeTitle(prize)} `}
        </span>
        awarded
      </div>
    </div>
  );
};

UnlockNotification.propTypes = {
  level: propTypes.number.isRequired,
  prize: propTypes.shape({
    sourceType: propTypes.string.isRequired,
    spent: propTypes.bool.isRequired,
    value: propTypes.number.isRequired,
    level: propTypes.number.isRequired,
  }),
};

export default UnlockNotification;
