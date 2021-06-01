import propTypes from "prop-types";
import React from "react";

import LogoIcon from "../../../images/logo-icon.svg";

const PopupImage = ({ type, image }) => {
  if (type.includes("vote")) {
    return <img src={image} />;
  }

  return <LogoIcon />;
};

PopupImage.propTypes = {
  type: propTypes.string.isRequired,
  image: propTypes.string,
};

export default PopupImage;
