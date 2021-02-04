import { useRequest } from "ahooks";
import React from "react";

import { createAPI } from "../../api";
import { CompetitionInfo } from "../competition-info";
import { Competitors } from "../competitors";
import { CompetitorsSearch } from "../competitors-search/";
import { Error } from "../error";
import { Footer } from "../footer";
import { HeaderNotLogin } from "../header-not-login";
import { Loading } from "../loading";
import { NewIn } from "../new-in";

const Leaderboard = () => {
  const api = createAPI();

  const getChildren = () => {
    return api.get(`/competitions/1/children`);
  };

  const getCompetition = () => {
    return api.get(`/competitions/1`);
  };

  const {
    data: competitionData,
    error: competitionError,
    loading: competitionLoading,
  } = useRequest(getCompetition, {
    formatResult: (res) => res.data,
  });

  const {
    data: childrenData,
    error: childrenError,
    loading: childrenLoading,
  } = useRequest(getChildren, {
    formatResult: (res) => res.data,
  });

  if (childrenError || competitionError) {
    return <Error />;
  }
  if (childrenLoading || competitionLoading) {
    return <Loading />;
  }

  return (
    <>
      <HeaderNotLogin />
      <CompetitorsSearch competitors={childrenData} />
      <NewIn competitors={childrenData} />
      <CompetitionInfo
        timeLeft={competitionData.timeLeft}
        prize={competitionData.prize}
      />
      <Competitors competitors={childrenData} />
      <Footer />
    </>
  );
};

export default Leaderboard;
