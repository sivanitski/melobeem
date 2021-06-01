import { useRequest } from "ahooks";
import React, { useContext } from "react";
import { useHistory } from "react-router";

import { api } from "../../api";
import ChildContext from "../../helpers/child-context";
import UserContext from "../../helpers/user-context";
import Loader from "../animation/loader";
import { Error } from "../error";
import { Footer } from "../footer";
import { HeaderUser } from "../header-user";
import { Popup } from "../popup";
import NoSpinner from "./screens/no-spinner";
import Spinner from "./screens/spinner";

const SpinnerPage = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const { currentChild, setCurrentChild } = useContext(ChildContext);

  const getSpinnersInfo = () => {
    return api.get(`/spins/check_presence`);
  };

  const { data, error, loading, run: requestSpinnerInfo } = useRequest(
    getSpinnersInfo,
    {
      formatResult: (res) => res.data,
    }
  );

  const updateCurrentChild = async () => {
    const {
      data: { entry },
    } = await api.get("/entries/current");
    setCurrentChild(entry);
  };

  const popupType = !user ? "spinner-not-login" : "spinner-not-entered";

  if (!currentChild?.currentCompetition) {
    return (
      <>
        <Spinner spinnerData={{ type: "free" }} />
        <Popup handlePopupClose={() => history.push("/")} type={popupType} />
        <Footer active="spinner" />
      </>
    );
  }

  const renderSpinnerScreen = () => {
    if (error) {
      return <Error />;
    }

    if (loading) {
      return <Loader />;
    }

    if (data.type) {
      return (
        <Spinner spinnerData={data} updateCurrentChild={updateCurrentChild} />
      );
    }

    return <NoSpinner requestSpinnerInfo={requestSpinnerInfo} />;
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
