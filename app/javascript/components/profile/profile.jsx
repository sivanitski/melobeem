import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router";

import { api } from "../../api";
import ChildContext from "../../helpers/child-context";
import UserContext from "../../helpers/user-context";
import { BackButton } from "../back-button";
import { Error } from "../error";
import { Footer } from "../footer";
import { Loading } from "../loading";
import { ProfileChildren } from "../profile-children";
import { ProfileHeader } from "../profile-header";
import { ProfileNav } from "../profile-nav";

const Profile = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const { user } = useContext(UserContext);
  const { currentChild } = useContext(ChildContext);

  const getProfile = () => {
    return api.get(`/users/${id}`);
  };

  const { data, error, loading, run: requestProfile } = useRequest(getProfile, {
    formatResult: (res) => res.data.user,
  });

  useEffect(() => {
    requestProfile();
  }, [id]);

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="profile">
        {user?.id === data.id ? (
          <>
            <ProfileHeader user={user} childName={currentChild?.name} />
            <ProfileNav userId={user.id} />
          </>
        ) : (
          <>
            {history.action !== "POP" && <BackButton />}
            <ProfileHeader
              requestProfile={requestProfile}
              user={data}
              isAnotherUser
            />
            <ProfileChildren userId={data.id} />
          </>
        )}
      </div>
      <Footer active="profile" />
    </>
  );
};

Profile.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }),
  history: propTypes.shape({
    action: propTypes.string.isRequired,
  }),
};

export default withRouter(Profile);
