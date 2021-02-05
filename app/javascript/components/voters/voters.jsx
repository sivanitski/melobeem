import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { createAPI } from "../../api";
import GoBack from "../../images/go-back.svg";
import { Error } from "../error";
import { Loading } from "../loading";

const Voters = ({
  match: {
    params: { id },
  },
}) => {
  const api = createAPI();
  const getVoters = () => {
    return api.get(`/competitions/1/children/${id}/voters`);
  };

  const { data: voters, error, loading } = useRequest(getVoters, {
    formatResult: (res) => res.data,
  });

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="voters">
      <h1 className="headline--small voters__title">Last 10 Voters</h1>
      <Link to={`/entry/${id}`} className="voters__go-back">
        <GoBack />
      </Link>
      <div className="voters__list">
        {voters.map((voter) => (
          <div key={voter.id} className="voters__item">
            <img src={voter.avatar} className="voters__item__img" />
            <div className="voters__item__name">{voter.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

Voters.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }),
};

export default withRouter(Voters);
