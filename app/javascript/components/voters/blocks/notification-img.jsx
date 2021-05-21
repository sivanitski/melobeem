import propTypes from "prop-types";
import React from "react";

import MelobeemIcon from "../../../images/melobeem-small-logo.svg";
import PrizeIconVotes from "../../../images/prize-icon-votes.svg";
import SpinnerIcon from "../../../images/spinner-pink.svg";

const NotificationImg = ({ image, type }) => {
  if (type === "bonus") {
    return <MelobeemIcon />;
  }

  if (type === "spinner") {
    return <SpinnerIcon className="notification-img__spinner" />;
  }

  if (type === "shop") {
    return <PrizeIconVotes />;
  }

  return <img src={image} />;
};

NotificationImg.propTypes = {
  image: propTypes.string,
  type: propTypes.string,
};

export default NotificationImg;
