import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import UserContext from "../../helpers/user-context";

const ProfileRoute = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Redirect to="/" />;
  }

  return <Redirect to={`/profile/${user.id}`} />;
};

export default ProfileRoute;
