import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const VoteNotification = ({ imageUrl, entryId, entryName }) => {
  return (
    <div className="notification-item">
      <div className="notification-item__img">
        <img src={imageUrl}></img>
      </div>
      <div className="notification-item__text text-grey">
        You voted for
        <Link
          className="notification-item__value text-black"
          to={`/entry/${entryId}`}
        >
          {entryName}
        </Link>
      </div>
    </div>
  );
};

VoteNotification.propTypes = {
  entryId: propTypes.number.isRequired,
  entryName: propTypes.string.isRequired,
  imageUrl: propTypes.string,
};

export default VoteNotification;
