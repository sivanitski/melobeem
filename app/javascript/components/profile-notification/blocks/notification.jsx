import classNames from "classnames";
import propTypes from "prop-types";
import React from "react";

import NotificationImg from "./notification-img";

const Notification = ({ image, type, title, subtitle, subsubtitle }) => {
  const textClasses = classNames("notification-item__text", {
    "text-grey": type !== "invitation",
    "text-black": type === "invitation",
  });

  const spanClasses = classNames("notification-item__value", {
    "text-grey": type === "invitation",
    "text-black": type !== "invitation",
  });

  return (
    <div className="notification-item">
      <div className="notification-item__img">
        <NotificationImg type={type} image={image} />
      </div>

      <div className={textClasses}>
        {title}
        <span className={spanClasses}>{subtitle}</span>
        {subsubtitle}
      </div>
    </div>
  );
};

Notification.propTypes = {
  image: propTypes.string,
  type: propTypes.string,
  level: propTypes.number,
  title: propTypes.string,
  subtitle: propTypes.string,
  subsubtitle: propTypes.string,
};

export default Notification;
