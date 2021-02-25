import { useRequest } from "ahooks";
import React, { useContext } from "react";

import { createAPI } from "../../api";
import UserContext from "../../helpers/user-context";
import { CompetitionInfo } from "../competition-info";
import { Competitors } from "../competitors";
import { CompetitorsSearch } from "../competitors-search/";
import { Error } from "../error";
import { Footer } from "../footer";
import { HeaderLogin } from "../header-login";
import { HeaderNotLogin } from "../header-not-login";
import { Loading } from "../loading";

const Leaderboard = () => {
  const { user } = useContext(UserContext);
  const api = createAPI();

  const getCompetition = () => {
    return api.get(`/competitions/current`);
  };

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
    formatResult: (res) => res.data.competition,
  });

  if (competitionError || childrenError) {
    return <Error />;
  }
  if (competitionLoading || childrenLoading) {
    return <Loading />;
  }

  return (
    <>
      {user ? (
        <HeaderLogin endsAt={competitionData.endsAt} />
      ) : (
        <HeaderNotLogin />
      )}
      <CompetitorsSearch competitors={childrenData} />
      <CompetitionInfo
        timeLeft={competitionData.endsAt}
        prize={competitionData.prizeCents}
      />
      <Competitors competitors={childrenData} />
      <Footer />
    </>
  );
};

export default Leaderboard;
