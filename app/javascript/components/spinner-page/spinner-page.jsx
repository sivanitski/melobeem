import "./style.less";

import { useRequest } from "ahooks";
import React, { useContext } from "react";
import { Redirect } from "react-router";

import { api } from "../../api";
import ChildContext from "../../helpers/child-context";
import { Error } from "../error";
import { Footer } from "../footer";
import { HeaderUser } from "../header-user";
import { Loading } from "../loading";
import FreeSpinner from "./screens/free-spinner";
import NoSpinner from "./screens/no-spinner";
import PremiumSpinner from "./screens/premium-spinner";

const FREE_SPINNER_TITLE_INFO = "What is Free Spinner?";
const FREE_SPINNER_TEXT_INFO =
  "You have one free spin every 24 hours, to win extra votes.";

const SpinnerPage = () => {
  const { currentChild } = useContext(ChildContext);

  if (!currentChild) {
    return <Redirect to="/" />;
  }

  const getSpinnersInfo = () => {
    return api.get(`/spins/check_presence`);
  };

  const { data, error, loading } = useRequest(getSpinnersInfo, {
    formatResult: (res) => res.data,
  });

  const renderSpinnerScreen = () => {
    if (error) {
      return <Error />;
    }

    if (loading) {
      return <Loading />;
    }

    if (data.type === "premium") {
      return <PremiumSpinner />;
    }

    if (data.type === "free") {
      return (
        <FreeSpinner
          infoTotle={FREE_SPINNER_TITLE_INFO}
          infoText={FREE_SPINNER_TEXT_INFO}
        />
      );
    }

    return (
      <NoSpinner
        infoTitle={FREE_SPINNER_TITLE_INFO}
        infoText={FREE_SPINNER_TEXT_INFO}
      />
    );
  };

  return (
    <>
      <HeaderUser child={currentChild} />

      {renderSpinnerScreen()}

      <Footer />
    </>
  );
};

export default SpinnerPage;
