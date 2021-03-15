import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import ChildContext from "../../helpers/child-context";
import UserContext from "../../helpers/user-context";
import { Footer } from "../footer";
import { ProfileHeader } from "../profile-header";
import { ProfileNav } from "../profile-nav";

const ProfileUser = () => {
  const { user } = useContext(UserContext);
  const { currentChild } = useContext(ChildContext);

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="profile">
        <ProfileHeader user={user} childName={currentChild?.name} />

        <ProfileNav currentChild={currentChild} userId={user.id} />
      </div>
      <Footer />
    </>
  );
};

export default ProfileUser;
