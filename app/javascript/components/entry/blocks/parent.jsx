import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const Parent = ({ username, avatarUrl, userId }) => {
  return (
    <Link to={`/profile/${userId}`} className="entry-parent">
      <div className="entry-parent__img">
        <img src={avatarUrl} />
      </div>
      <div className="entry-parent__name headline text-black">{username}</div>
    </Link>
  );
};

Parent.propTypes = {
  username: propTypes.string.isRequired,
  avatarUrl: propTypes.string.isRequired,
  userId: propTypes.number.isRequired,
};

export default Parent;
