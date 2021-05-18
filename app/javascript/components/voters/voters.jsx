import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useContext } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { api } from "../../api";
import UserContext from "../../helpers/user-context";
import GoBack from "../../images/go-back.svg";
import { Error } from "../error";
import { Loading } from "../loading";
import LastTenVoters from "./screens/last-ten-voters";
import VotersStatistic from "./screens/voters-statistic";

const Voters = ({
  match: {
    params: { id },
  },
}) => {
  const { user } = useContext(UserContext);

  const getChild = () => {
    return api.get(`/entries/${id}`);
  };

  const { data: child, error: childError, loading: childLoading } = useRequest(
    getChild,
    {
      formatResult: (res) => res.data.entry,
    }
  );

  if (childError) {
    return <Error />;
  }

  if (childLoading) {
    return <Loading />;
  }

  return (
    <div className="notification">
      <Link to={`/entry/${id}`} className="go-back">
        <GoBack />
      </Link>

      {child.userId === user.id ? (
        <VotersStatistic id={id} />
      ) : (
        <LastTenVoters id={id} />
      )}
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
