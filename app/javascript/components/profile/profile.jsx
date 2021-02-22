import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router";

import { createMockAPI } from "../../api";
import { BackButton } from "../back-button";
import { Error } from "../error";
import { Loading } from "../loading";

const Profile = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const api = createMockAPI();

  const getProfile = () => {
    return api.get(`/parents/${id}`);
  };

  const { data, error, loading } = useRequest(getProfile, {
    formatResult: (res) => res.data,
  });

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="profile">
      {history.action !== "POP" && <BackButton />}
      <div className="profile-header">
        <div>
          <img className="profile-header__img" src={data.avatar} />
        </div>
        <div className="profile-header__main">
          <div className="profile-header__name headline--medium">
            Baby: {data.name}
          </div>
          <div className="profile-header__child text-small text-grey">
            {data.childName}
          </div>
          <button type="button" className="profile-header__button">
            ADD TO FRIENDS
          </button>
        </div>
      </div>
      <div className="profile-children">
        <div className="profile-children__item">
          <div className="profile-children__img">
            <img src={data.child[0].avatar} />
          </div>
          <span className="text-grey">Now</span>
        </div>

        {data.children.map((child) => (
          <div key={child.id} className="profile-children__item">
            <div className="profile-children__img">
              <img src={child.avatar} />
            </div>
            <span className="text-grey">Previous</span>
          </div>
        ))}
      </div>
    </div>
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
