import { useRequest } from "ahooks";
import React, { useContext } from "react";
import { Redirect } from "react-router";

import { api } from "../../api";
import ChildContext from "../../helpers/child-context";
import { Error } from "../error";
import { Footer } from "../footer";
import { HeaderUser } from "../header-user";
import { Loading } from "../loading";
import NoSpinner from "./screens/no-spinner";
import Spinner from "./screens/spinner";

const SpinnerPage = () => {
  const { currentChild, setCurrentChild } = useContext(ChildContext);

  if (!currentChild?.currentCompetition) {
    return <Redirect to="/" />;
  }

  const getSpinnersInfo = () => {
    return api.get(`/spins/check_presence`);
  };

  const { data, error, loading } = useRequest(getSpinnersInfo, {
    formatResult: (res) => res.data,
  });

  const updateCurrentChild = async () => {
    const {
      data: { entry },
    } = await api.get("/entries/current");
    setCurrentChild(entry);
  };

  const renderSpinnerScreen = () => {
    if (error) {
      return <Error />;
    }

    if (loading) {
      return <Loading />;
    }

    if (data.type) {
      return (
        <Spinner spinnerData={data} updateCurrentChild={updateCurrentChild} />
      );
    }

    return <NoSpinner />;
  };

  return (
    <>
      <HeaderUser child={currentChild} />

      {renderSpinnerScreen()}

      <Footer active="spinner" />
    </>
  );
};

export default SpinnerPage;
