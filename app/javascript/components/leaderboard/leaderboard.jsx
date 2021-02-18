import { useRequest } from "ahooks";
import React from "react";

import { createAPI, createMockAPI } from "../../api";
import { makeArrayCamelCase } from "../../helpers/utils";
import { CompetitionInfo } from "../competition-info";
import { Competitors } from "../competitors";
import { CompetitorsSearch } from "../competitors-search/";
import { Error } from "../error";
import { Footer } from "../footer";
import { HeaderNotLogin } from "../header-not-login";
import { Loading } from "../loading";
// import { NewIn } from "../new-in";

const Leaderboard = () => {
  const mockApi = createMockAPI();

  const getCompetition = () => {
    return mockApi.get(`/competitions/1`);
  };

  const api = createAPI();
  const getEntries = () => {
    return api.get("/entries");
  };

  const {
    data: childrenData,
    error: childrenError,
    loading: childrenLoading,
  } = useRequest(getEntries, {
    formatResult: (res) => res.data.entries,
  });

  const {
    data: competitionData,
    error: competitionError,
    loading: competitionLoading,
  } = useRequest(getCompetition, {
    formatResult: (res) => res.data,
  });

  if (competitionError || childrenError) {
    return <Error />;
  }
  if (competitionLoading || childrenLoading) {
    return <Loading />;
  }

  const data = makeArrayCamelCase(childrenData);

  return (
    <>
      <HeaderNotLogin />
      <CompetitorsSearch competitors={data} />
      {/* <NewIn competitors={childrenData} /> */}
      <CompetitionInfo
        timeLeft={competitionData.timeLeft}
        prize={competitionData.prize}
      />
      <Competitors competitors={data} />
      <Footer />
    </>
  );
};

export default Leaderboard;
