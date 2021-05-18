import propTypes from "prop-types";
import React from "react";

import PrizeIconLevel from "../../../images/prize-icon-level.svg";
import PrizeIconSpin from "../../../images/prize-icon-spin.svg";
import PrizeIconVotes from "../../../images/prize-icon-votes.svg";

const NotificationImg = ({ image, type }) => {
  if (type === "unlock") {
    return <PrizeIconLevel />;
  }

  if (type === "buySpins") {
    return <PrizeIconSpin />;
  }

  if (type === "buyVotes" || type === "invitation") {
    return <PrizeIconVotes />;
  }

  return <img src={image} />;
};

NotificationImg.propTypes = {
  image: propTypes.string,
  type: propTypes.string,
};

export default NotificationImg;
