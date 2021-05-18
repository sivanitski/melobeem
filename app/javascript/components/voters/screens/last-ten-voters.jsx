import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { api } from "../../../api";
import { Error } from "../../error";
import { Loading } from "../../loading";

const LastTenVoters = ({ id }) => {
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
    <>
      <h1 className="headline--small voters__title">Last 10 Voters</h1>

      <div className="voters__list">
        {voters.map((voter) => (
          <Link
            to={`/profile/${voter.id}`}
            key={voter.id}
            className="voters__item"
          >
            <img src={voter.avatarUrl} className="voters-item__img" />
            <div className="voters-item__name">{voter.name}</div>
          </Link>
        ))}
      </div>
    </>
  );
};

LastTenVoters.propTypes = {
  id: propTypes.string.isRequired,
};

export default LastTenVoters;
