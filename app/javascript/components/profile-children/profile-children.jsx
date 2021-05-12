import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React from "react";

import { api } from "../../api";
import { Error } from "../error";
import { Loading } from "../loading";
import { ProfileChildrenItem } from "../profile-children-item";

const ProfileChildren = ({ userId }) => {
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
    return <Loading />;
  }

  return (
    <div className="profile-children">
      {children &&
        children.map((child) => (
          <ProfileChildrenItem key={child.id} child={child} />
        ))}
    </div>
  );
};

ProfileChildren.propTypes = {
  userId: propTypes.number.isRequired,
};

export default ProfileChildren;
