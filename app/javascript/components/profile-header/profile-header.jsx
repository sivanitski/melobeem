import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { api } from "../../api";
import imageAvatar from "../../images/avatar.png";
import NotificationImage from "../../images/notification.svg";
import SettingImage from "../../images/setting.svg";

const ProfileHeader = ({ user, childName, isAnotherUser }) => {
  const handleAddFriend = async () => {
    if (user.friendsWithCurrentUser) {
      return;
    }

    await api.post(`/users/${user.id}/friends/add_friend`);
  };

  return (
    <div className="profile-header">
      {!isAnotherUser && (
        <div className="profile-header__menu">
          <Link
            className="profile-header__notification"
            to="/profile/notifications"
          >
            <NotificationImage />
          </Link>
          <Link className="profile-header__setting" to="/profile/setting">
            <SettingImage />
          </Link>
        </div>
      )}

      <div>
        <img
          className="profile-header__img"
          src={user.avatarUrl || imageAvatar}
        />
      </div>
      <div className="profile-header__main">
        <div className="profile-header__name headline--medium">{user.name}</div>
        <div className="profile-header__child text-small text-grey">
          Baby: {childName || "Not participating"}
        </div>
        {isAnotherUser && (
          <button
            type="button"
            className="profile-header__button"
            onClick={handleAddFriend}
          >
            {user.friendsWithCurrentUser ? "FRIENDS" : "ADD TO FRIENDS"}
          </button>
        )}
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  user: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    avatarUrl: propTypes.string.isRequired,
    friendsWithCurrentUser: propTypes.bool,
    friendshipSourceType: propTypes.string,
  }).isRequired,
  childName: propTypes.string,
  isAnotherUser: propTypes.bool,
};

export default ProfileHeader;
