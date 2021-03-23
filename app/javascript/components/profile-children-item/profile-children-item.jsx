import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import imageChild from "../../images/header-left@2x.png";

const ProfileChildrenItem = ({ child, isCurrent }) => {
  return (
    <Link to={`/entry/${child.id}`} className="profile-children__item">
      <div className="profile-children__img">
        <img src={child.imageUrl || imageChild} />
      </div>
      <span className="text-grey">{isCurrent ? "Now" : "Previous"}</span>
    </Link>
  );
};

ProfileChildrenItem.propTypes = {
  child: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    imageUrl: propTypes.string.isRequired,
  }),
  isCurrent: propTypes.bool,
};

export default ProfileChildrenItem;
