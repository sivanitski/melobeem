import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import PrizeIconVotes from "../../../images/prize-icon-votes.svg";

const InviteNotification = ({ payload }) => {
  return (
    <div className="notification-item">
      <div className="notification-item__img">
        <PrizeIconVotes />
      </div>
      <div className="notification-item__text text-grey">
        <span className="notification-item__value text-black">
          {payload.prize} votes
        </span>
        for inviting
        <Link
          className="notification-item__value text-black"
          to={`/profile/${payload.referrer.id}`}
        >
          {payload.referrer.name}
        </Link>
      </div>
    </div>
  );
};

InviteNotification.propTypes = {
  payload: propTypes.shape({
    prize: propTypes.number.isRequired,
    referrer: propTypes.shape({
      name: propTypes.string.isRequired,
      id: propTypes.number.isRequired,
    }),
  }),
};

export default InviteNotification;
