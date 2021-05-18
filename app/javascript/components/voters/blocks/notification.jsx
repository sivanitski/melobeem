import propTypes from "prop-types";
import React from "react";

import IconHeart from "../../../images/icon-heart.svg";
import NotificationImg from "./notification-img";

const Notification = ({ image, voteAmount, text, type }) => {
  return (
    <div className="notification-item text-black">
      <div className="notification-item__img">
        <NotificationImg type={type} image={image} />
      </div>
      <div className="notification-item__text">{text}</div>
      <div className="notification__like text-pink">
        <IconHeart className="svg-pink" /> {voteAmount}
      </div>
    </div>
  );
};

Notification.propTypes = {
  image: propTypes.string,
  voteAmount: propTypes.number.isRequired,
  text: propTypes.string.isRequired,
  type: propTypes.string,
};

export default Notification;
