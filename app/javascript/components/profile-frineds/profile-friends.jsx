import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React from "react";
import { ShareButton } from "react-facebook";
import { Link } from "react-router-dom";

import { api } from "../../api";
import { Loading } from "../loading";

const ProfileFriends = ({ userId }) => {
  const currentHost = window.location.hostname;

  const getFriends = () => {
    return api.get(`/users/${userId}/friends`);
  };

  const { data, loading } = useRequest(getFriends, {
    formatResult: (res) => res.data.users,
  });

  if (loading) {
    return <Loading />;
  }

  const friends = data;
  return (
    <div className="profile-friends">
      <ShareButton href={`https://${currentHost}/?ref=${userId}`}>
        Invite Friends
      </ShareButton>

      {friends &&
        friends.map((friend) => (
          <Link
            key={friend.id}
            to={`/profile/${friend.id}`}
            className="profile-friend__item"
          >
            <div className="profile-friend__wrapper">
              <div className="profile-friend__img">
                <img src={friend.avatarUrl} />
              </div>
              <div className="profile-friend__names">
                <div className="profile-friends__parent text-black">
                  {friend.name}
                </div>
                <div className="profile-friend__child text-smaller text-grey">
                  Baby: {friend.childName || "Not participating"}
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

ProfileFriends.propTypes = {
  userId: propTypes.number.isRequired,
};

export default ProfileFriends;
