import propTypes from "prop-types";
import React from "react";

import HalloweenLogo from "../../../images/halloween_logo.svg";
import LogoIcon from "../../../images/logo-icon.svg";

const PopupImage = ({ type, image }) => {
  if (type.includes("vote")) {
    return <img src={image} />;
  }

  if (type === "halloween_sale") {
    return <HalloweenLogo />;
  }

  return <LogoIcon />;
};

PopupImage.propTypes = {
  type: propTypes.string.isRequired,
  image: propTypes.string,
};

export default PopupImage;
