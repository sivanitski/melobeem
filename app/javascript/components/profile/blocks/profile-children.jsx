import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useContext } from "react";

import { api } from "../../../api";
import UserContext from "../../../helpers/user-context";
import { Error } from "../../error";
import ProfileBabyLoader from "../../loaders/profile/profile-baby-loader";
import ProfileChildrenItem from "./profile-children-item";
import ProfileLocker from "./profile-locker";

const ProfileChildren = ({ userId }) => {
  const { user } = useContext(UserContext);
  const getUserEntries = () => {
    return api.get(`/users/${userId}/entries`);
  };

  const { data: children, error, loading } = useRequest(getUserEntries, {
    formatResult: (res) => res.data.entries,
  });

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <ProfileBabyLoader />;
  }

  return (
    <div className="profile-children">
      {children.length > 0 && (
        <ProfileChildrenItem key={children[0].id} child={children[0]} />
      )}

      {user.id === userId && <ProfileLocker userId={userId} />}

      {children.length > 1 &&
        children
          .slice(1)
          .map((child) => <ProfileChildrenItem key={child.id} child={child} />)}
    </div>
  );
};

ProfileChildren.propTypes = {
  userId: propTypes.number.isRequired,
};

export default ProfileChildren;
