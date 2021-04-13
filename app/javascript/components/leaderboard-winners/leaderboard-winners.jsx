import { useRequest } from "ahooks";
import React from "react";
import { Link } from "react-router-dom";

import { createAPI } from "../../api";
import GoBack from "../../images/go-back.svg";
import { CompetitorsList } from "../competitors-list";
import { Error } from "../error";
import { Footer } from "../footer";
import { Loading } from "../loading";

const LeaderboardWinners = () => {
  const api = createAPI();

  const getWinners = () => {
    return api.get(`/competitions/previous_winners`);
  };

  const { data: winners, error, loading } = useRequest(getWinners, {
    formatResult: (res) => res.data.entries,
  });

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="winners">
        <h1 className="headline--small setting__title">Previous winners</h1>
        <Link to="/" className="go-back">
          <GoBack />
        </Link>
        <CompetitorsList
          competitors={winners}
          messageNoChildren="There’s no previous competitions yet"
        />
      </div>

      <Footer />
    </>
  );
};

export default LeaderboardWinners;
