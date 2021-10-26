import "swiper/swiper.less";

import { useRequest } from "ahooks";
import groupBy from "lodash.groupby";
import propTypes from "prop-types";
import React, { useState } from "react";
import { ShareButton } from "react-facebook";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import { api } from "../../../api";
import ImageAvatar from "../../../images/avatar.svg";
import IconHeart from "../../../images/icon-heart.svg";
import InfoImage from "../../../images/info-sign.svg";
import { InfoBlock } from "../../info-block";
import ProfileBabyLoader from "../../loaders/profile/profile-baby-loader";

const PROFILE_TITLE_INFO = "Better together!";
const PROFILE_TEXT_INFO =
  "Invite your friends to Melobeem to earn rewards. Rewards will increase when each new friend enters the competition.";

const ProfileFriends = ({ userId }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const currentHost = window.location.hostname;

  const getFriends = () => {
    return api.get(`/users/${userId}/friends`);
  };

  const { data: friends, loading } = useRequest(getFriends, {
    formatResult: (res) => res.data.users,
  });

  if (loading) {
    return <ProfileBabyLoader />;
  }

  let { internal: friendsMelobeem = [], external: friendsFb = [] } = groupBy(
    friends,
    "sourceType"
  );

  const sortedFriends = [...friendsFb, ...friendsMelobeem];

  return (
    <div className="profile-friends">
      <h2 className="profile-friends__subtitle">
        Invite friends
        <div
          className="profile-friends__info"
          onClick={() => setIsInfoOpen(true)}
        >
          <InfoImage className="svg-light-pink" />
        </div>
      </h2>
      {isInfoOpen && (
        <InfoBlock
          title={PROFILE_TITLE_INFO}
          text={PROFILE_TEXT_INFO}
          handleInfoClose={() => setIsInfoOpen(false)}
        />
      )}

      <Swiper
        className="swiper fb-friend__swiper"
        spaceBetween={20}
        slidesPerView="auto"
      >
        {friendsFb &&
          friendsFb.map((friend) => (
            <SwiperSlide key={friend.id} className=" fb-friend__slide">
              <Link className="fb-friend__item" to={`/profile/${friend.id}`}>
                <div className="fb-friend__img">
                  <img src={friend.avatarUrl} />
                </div>
                <span className="text-black fb-friend__name">
                  {friend.name}
                </span>
                <span className="text-pink fb-friend__prize">
                  + <IconHeart className="fb-friend__heart svg-pink" />{" "}
                  {friend.invitationPrize}
                </span>
              </Link>
            </SwiperSlide>
          ))}
        <SwiperSlide className="fb-friend__slide">
          <div className="fb-friend__item">
            <div className="fb-friend__img">
              <ImageAvatar />
            </div>
            <ShareButton
              href={`https://${currentHost}/?ref=${userId}`}
              className="fb-friend__item__invite"
            >
              Invite Friends
            </ShareButton>
            <span className="text-grey fb-friend__prize">
              + <IconHeart className="fb-friend__heart svg-grey" />
              {` ${friendsFb.length ? (friendsFb.length + 1) * 5 : 5}`}
            </span>
          </div>
        </SwiperSlide>
      </Swiper>

      <h2 className="profile-friends__subtitle">Friends</h2>

      {sortedFriends &&
        sortedFriends.map((friend) => (
          <Link
            key={friend.id}
            to={`/profile/${friend.id}`}
            className="profile-friend__item"
          >
            {friend.sourceType === "external" && (
              <div className="profile-friend__invited text-small">invited</div>
            )}
            <div className="profile-friend__wrapper">
              <div className="profile-friend__img">
                <img src={friend.avatarUrl} />
              </div>
              <div className="profile-friend__names">
                <div className="profile-friends__parent text-black">
                  {friend.name}
                </div>
                <div className="profile-friend__child text-smaller text-grey">
                  Baby: {friend.currentBabyName || "Not participating"}
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
