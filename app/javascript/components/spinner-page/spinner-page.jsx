import { useRequest } from "ahooks";
import React, { useContext, useEffect, useState } from "react";
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
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const { currentChild, setCurrentChild } = useContext(ChildContext);
  const [animationParams, setAnimationParams] = useState({
    isAnimationPlay: false,
    votesStart: 0,
    votesEnd: 0,
    rankStart: 0,
    rankEnd: 0,
    level: 0,
  });

  useEffect(() => {
    async function loadCurrentChild() {
      const {
        data: { entry },
      } = await api.get("/entries/current");
      setCurrentChild(entry);
    }

    loadCurrentChild();
  }, []);

  const getSpinnersInfo = () => {
    return api.get(`/spins/check_presence`);
  };

  const { data, error, loading, run: requestSpinnerInfo } = useRequest(
    getSpinnersInfo,
    {
      formatResult: (res) => res.data,
    }
  );

  const updateUser = async () => {
    const {
      data: { user: updatedUser },
    } = await api.get("users/current");
    setUser((user) => ({
      ...user,
      anySpins: updatedUser.anySpins,
    }));
  };

  const updateCurrentChild = async () => {
    setAnimationParams((animationParams) => ({
      ...animationParams,
      votesStart: currentChild.totalVotes,
      rankStart: currentChild.rank,
    }));
    const {
      data: { entry },
    } = await api.get("/entries/current");

    setAnimationParams((animationParams) => ({
      ...animationParams,
      isAnimationPlay: true,
      votesEnd: entry.totalVotes,
      rankEnd: entry.rank,
      level: entry.level,
    }));

    setTimeout(() => setCurrentChild(entry), 3000);
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
        <Spinner
          spinnerData={data}
          updateCurrentChild={updateCurrentChild}
          updateUser={updateUser}
        />
      );
    }

    return (
      <NoSpinner
        requestSpinnerInfo={requestSpinnerInfo}
        updateUser={updateUser}
      />
    );
  };

  return (
    <>
      <HeaderUser child={currentChild} animationParams={animationParams} />

      {renderSpinnerScreen()}

      <Footer active="spinner" />
    </>
  );
};

export default SpinnerPage;
