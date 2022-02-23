import propTypes from "prop-types";
import React from "react";

import defaultProptypes from "../../default-proptypes";
import { ProfileChildrenItem } from "../profile-children-item";

const ProfileChildren = ({ currentChild, previousChildren }) => {
  return (
    <div className="profile-children">
      {currentChild && <ProfileChildrenItem child={currentChild} isCurrent />}

      {previousChildren &&
        previousChildren.map((child) => (
          <ProfileChildrenItem key={child.id} child={child} />
        ))}
    </div>
  );
};

ProfileChildren.propTypes = {
  currentChild: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    imageUrl: propTypes.string.isRequired,
  }),
  previousChildren: propTypes.arrayOf(defaultProptypes.CHILD),
};

export default ProfileChildren;
