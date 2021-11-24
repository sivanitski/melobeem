import propTypes from "prop-types";
import React from "react";

import BlackFridayLogo from "../../../images/black_friday_logo.svg";
import HalloweenLogo from "../../../images/halloween_logo.svg";
import LogoIcon from "../../../images/logo-icon.svg";

const PopupImage = ({ type, image }) => {
  if (type.includes("vote")) {
    return <img src={image} />;
  }

  if (type === "halloween_sale") {
    return <HalloweenLogo />;
  }

  if (type === "black_friday_sale") {
    return <BlackFridayLogo />;
  }

  return <LogoIcon />;
};

PopupImage.propTypes = {
  type: propTypes.string.isRequired,
  image: propTypes.string,
};

export default PopupImage;
