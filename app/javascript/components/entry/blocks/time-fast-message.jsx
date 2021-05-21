import classNames from "classnames";
import propTypes from "prop-types";
import React from "react";

const TimeMessage = ({ value }) => {
  const timeInfoClasses = classNames("text-smaller entry_prize-time", {
    "text-green": value === 10,
    "text-yellow": value === 20,
    "text-blue": value === 30,
  });

  return <div className={timeInfoClasses}>You can vote every {value} min</div>;
};

TimeMessage.propTypes = {
  value: propTypes.number.isRequired,
};

export default TimeMessage;
