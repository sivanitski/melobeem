import propTypes from "prop-types";
import React from "react";

const TimerField = ({ text, handleClick, classes, id }) => {
  if (!text) {
    return null;
  }

  return (
    <div className={classes} onClick={handleClick} id={id}>
      {text}
    </div>
  );
};

TimerField.propTypes = {
  text: propTypes.string.isRequired,
  handleClick: propTypes.func,
  classes: propTypes.string,
  id: propTypes.string,
};

export default TimerField;
