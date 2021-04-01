import { useRequest } from "ahooks";
import React, { useContext } from "react";

import { createAPI } from "../../api";
import ChildContext from "../../helpers/child-context";
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
  const { setCurrentChild } = useContext(ChildContext);
  const api = createAPI();

  const getCompetition = () => {
    return api.get(`/competitions/current`);
  };

  const getEntries = () => {
    return api.get("/entries", {
      params: {
        per: 50,
      },
    });
  };

  const getCurrentEntryWhenUserLogin = async () => {
    const {
      data: { entry },
    } = await api.get("/entries/current");
    setCurrentChild(entry);
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
        <HeaderLogin
          endsAt={competitionData.endsAt}
          createdAt={competitionData.createdAt}
        />
      ) : (
        <HeaderNotLogin getCurrentEntry={getCurrentEntryWhenUserLogin} />
      )}
      <CompetitorsSearch />
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
