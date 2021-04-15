import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { api } from "../../api";
import GoBack from "../../images/go-back.svg";
import { Error } from "../error";
import { Loading } from "../loading";

const Voters = ({
  match: {
    params: { id },
  },
}) => {
  const getVoters = () => {
    return api.get(`/entries/${id}/latest_voters`);
  };

  const { data: voters, error, loading } = useRequest(getVoters, {
    formatResult: (res) => res.data.users,
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
      <Link to={`/entry/${id}`} className="go-back">
        <GoBack />
      </Link>
      <div className="voters__list">
        {voters.map((voter) => (
          <Link
            to={`/profile/${voter.id}`}
            key={voter.id}
            className="voters__item"
          >
            <img src={voter.avatarUrl} className="voters__item__img" />
            <div className="voters__item__name">{voter.name}</div>
          </Link>
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
