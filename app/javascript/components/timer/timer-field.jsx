import propTypes from "prop-types";
import React from "react";

const TimerField = ({ text, handleClick, classes }) => {
  if (!text) {
    return null;
  }

  return (
    <div className={classes} onClick={handleClick}>
      {text}
    </div>
  );
};

TimerField.propTypes = {
  text: propTypes.string.isRequired,
  handleClick: propTypes.func,
  classes: propTypes.string,
};

export default TimerField;
