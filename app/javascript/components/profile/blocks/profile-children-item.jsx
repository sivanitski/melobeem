import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const ProfileChildrenItem = ({ child }) => {
  return (
    <Link to={`/entry/${child.id}`} className="profile-children__item">
      <div className="profile-children__img">
        <img src={child.imageUrl} />
      </div>
      <span className="text-grey">{child.current ? "Now" : "Previous"}</span>
    </Link>
  );
};

ProfileChildrenItem.propTypes = {
  child: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    imageUrl: propTypes.string.isRequired,
    current: propTypes.bool.isRequired,
  }),
  isCurrent: propTypes.bool,
};

export default ProfileChildrenItem;
