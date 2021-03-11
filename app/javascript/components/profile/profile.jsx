import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router";

import { createAPI } from "../../api";
import { BackButton } from "../back-button";
import { Error } from "../error";
import { Footer } from "../footer";
import { Loading } from "../loading";
import { ProfileChildren } from "../profile-children";
import { ProfileHeader } from "../profile-header";

const Profile = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const api = createAPI();

  const getProfile = () => {
    return api.get(`/users/${id}`);
  };

  const { data, error, loading } = useRequest(getProfile, {
    formatResult: (res) => res.data.user,
  });

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="profile">
        {history.action !== "POP" && <BackButton />}

        <ProfileHeader user={data} isAnotherUser />

        <ProfileChildren />
      </div>
      <Footer />
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
