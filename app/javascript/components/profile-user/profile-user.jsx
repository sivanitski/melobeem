import "./style.less";

import { useRequest } from "ahooks";
import React, { useContext } from "react";

import { createAPI } from "../../api";
import UserContext from "../../helpers/user-context";
import imageAvatar from "../../images/avatar.png";
import imageBaby from "../../images/header-left@2x.png";
import { Error } from "../error";
import { Loading } from "../loading";

const ProfileUser = () => {
  const { user } = useContext(UserContext);

  const api = createAPI();
  const getCurrentBaby = () => {
    return api.get("/entries/current");
  };

  const { data, error, loading } = useRequest(getCurrentBaby, {
    formatResult: (res) => res.data.entry,
  });

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <div>
          <img
            className="profile-header__img"
            src={user.avatarUrl || imageAvatar}
          />
        </div>
        <div className="profile-header__main">
          <div className="profile-header__name headline--medium">
            {user.name}
          </div>
          <div className="profile-header__child text-small text-grey">
            Baby: {data.name}
          </div>
        </div>
      </div>
      <div className="profile-children">
        <div className="profile-children__item">
          <div className="profile-children__img">
            <img src={data.imageUrl || imageBaby} />
          </div>
          <span className="text-grey">Now</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
