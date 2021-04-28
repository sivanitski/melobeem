import propTypes from "prop-types";
import React from "react";

import SpinnerPink from "../../../images/spinner.svg";
import SpinnerOrange from "../../../images/spinner-orange.svg";
import SpinnerPurple from "../../../images/spinner-purple.svg";

const SpinnerImageColor = ({ spinnerType, spinnerAmount }) => {
  if (spinnerType === "free") {
    return <SpinnerPink />;
  }

  if (spinnerAmount > 5) {
    return <SpinnerOrange />;
  }

  return <SpinnerPurple />;
};

SpinnerImageColor.propTypes = {
  spinnerType: propTypes.string.isRequired,
  spinnerAmount: propTypes.number,
};

export default SpinnerImageColor;
