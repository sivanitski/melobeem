import { useRequest } from "ahooks";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { createAPI } from "../../api";
import UserContext from "../../helpers/user-context";
import { Footer } from "../footer";
import { Loading } from "../loading";
import { ProfileHeader } from "../profile-header";
import { ProfileNav } from "../profile-nav";

const ProfileUser = () => {
  const { user } = useContext(UserContext);

  const api = createAPI();
  const getCurrentBaby = () => {
    return api.get("/entries/current");
  };

  const { data, loading } = useRequest(getCurrentBaby, {
    formatResult: (res) => res.data.entry,
  });

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="profile">
        <ProfileHeader user={user} babyName={data.name} />

        <ProfileNav currentChild={data} userId={user.id} />
      </div>
      <Footer />
    </>
  );
};

export default ProfileUser;
