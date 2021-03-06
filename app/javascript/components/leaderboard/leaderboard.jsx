import { useRequest } from "ahooks";
import React, { useContext, useEffect } from "react";
import ReactPixel from "react-facebook-pixel";
import { useLocation } from "react-router-dom";

import { api } from "../../api";
import UserContext from "../../helpers/user-context";
import Loader from "../animation/loader";
import { CompetitionInfo } from "../competition-info";
import { Competitors } from "../competitors";
import { Error } from "../error";
import { Footer } from "../footer";
import { HeaderLogin } from "../header-login";
import { HeaderNotLogin } from "../header-not-login";

const Leaderboard = () => {
  const { user } = useContext(UserContext);

  const location = useLocation();

  const getCompetition = () => {
    return api.get(`/competitions/current`);
  };

  const {
    data: competitionData,
    error: competitionError,
    loading: competitionLoading,
  } = useRequest(getCompetition, {
    formatResult: (res) => res.data.competition,
  });

  useEffect(() => {
    const referralParams = new URLSearchParams(location.search);
    const referralId = referralParams.get("ref");

    if (referralId) {
      document.cookie = `ref=${referralId}; max-age=86400`;
    }
  }, [location.search]);

  useEffect(() => {
    if (!competitionLoading) {
      dataLayer.push({ event: "leaderboard view" });
      ReactPixel.trackCustom("leaderboard-view");
    }
  }, [competitionLoading]);

  if (competitionError) {
    return <Error />;
  }
  if (competitionLoading) {
    return <Loader />;
  }

  return (
    <>
      {user ? (
        <HeaderLogin
          endsAt={competitionData.endsAt}
          createdAt={competitionData.createdAt}
        />
      ) : (
        <HeaderNotLogin />
      )}
      <CompetitionInfo
        timeLeft={competitionData.endsAt}
        prize={competitionData.prizeCents}
        prizeCurrency={competitionData.prizeCurrency}
      />
      <Competitors />
      <Footer active="leaderboard" />
    </>
  );
};

export default Leaderboard;
