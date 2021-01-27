import { useRequest } from "ahooks";
import React from "react";

import { createAPI } from "../../api";
import { CompetitionInfo } from "../competition-info";
import { CompetitorsList } from "../competitors-list";
import { Footer } from "../footer";
import { HeaderNotLogin } from "../header-not-login";
import { NewIn } from "../new-in";

const Leaderboard = () => {
  const api = createAPI();

  const getCurrentCompetition = () => {
    return api.get(`/currentCompetition/1`);
  };

  const { data, error, loading } = useRequest(getCurrentCompetition, {
    formatResult: (res) => res.data,
  });

  if (error) {
    return <div>failed to load</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeaderNotLogin />
      <NewIn competitors={data.competitors} />
      <CompetitionInfo timeLeft={data.timeLeft} prize={data.prize} />
      <CompetitorsList competitors={data.competitors} />
      <Footer />
    </>
  );
};

export default Leaderboard;
