import propTypes from "prop-types";
import React from "react";

import { getExperationTimeInHoursInMinutes } from "../../../helpers/date";
import ClockBlueImage from "../../../images/clock-blue.svg";
import ClockGreenImage from "../../../images/clock-green.svg";
import ClockYellowImage from "../../../images/clock-yellow.svg";

const TimeMenu = ({ time, value, handleInfoOpen }) => {
  const defineImage = (value) => {
    if (value === 10) {
      return <ClockGreenImage />;
    }

    if (value === 20) {
      return <ClockYellowImage />;
    }

    if (value === 30) {
      return <ClockBlueImage />;
    }

    return null;
  };

  return (
    <div className="time-menu" onClick={handleInfoOpen}>
      <div className="time-menu__time text-grey text-tiny">
        {getExperationTimeInHoursInMinutes(time)}
      </div>
      <div className="time-menu__img">{defineImage(value)}</div>
    </div>
  );
};

TimeMenu.propTypes = {
  time: propTypes.number.isRequired,
  value: propTypes.number.isRequired,
  handleInfoOpen: propTypes.func.isRequired,
};

export default TimeMenu;
