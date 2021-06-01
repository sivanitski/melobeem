import propTypes from "prop-types";
import React, { useState } from "react";

import defaultProptypes from "../../../default-proptypes";
import ProfileChildren from "./profile-children";
import ProfileFriends from "./profile-friends";

const TABS = {
  BABY: "Baby",
  FRIENDS: "Friends",
};

const ProfileNav = ({ userId }) => {
  const [activeTab, setActiveTab] = useState(TABS.BABY);

  return (
    <>
      <div className="profile-nav">
        {Object.keys(TABS).map((tabNameKey) => (
          <div
            key={tabNameKey}
            className={`profile-nav__item headline ${
              TABS[tabNameKey] === activeTab && `profile-nav__item--active`
            }`}
            onClick={() => setActiveTab(TABS[tabNameKey])}
          >
            {TABS[tabNameKey]}
          </div>
        ))}
      </div>
      {activeTab === TABS.BABY ? (
        <ProfileChildren userId={userId} />
      ) : (
        <ProfileFriends userId={userId} />
      )}
    </>
  );
};

ProfileNav.propTypes = {
  currentChild: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    imageUrl: propTypes.string.isRequired,
  }),
  previousChildren: propTypes.arrayOf(defaultProptypes.CHILD),
  userId: propTypes.number.isRequired,
};

export default ProfileNav;
