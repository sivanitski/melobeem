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
  const [isPopupShown, setIsPopupShown] = useState(false);

  const history = useHistory();
  const { currentChild, setCurrentChild } = useContext(ChildContext);
  const [animationParams, setAnimationParams] = useState({
    isAnimationPlay: false,
    votesStart: 0,
    votesEnd: 0,
    rankStart: 0,
    rankEnd: 0,
    levelStart: 0,
    levelEnd: 0,
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

  const handleAnimationEnd = (amount, child) => {
    setCurrentChild(child);
    if (amount === 0 || !amount) {
      requestSpinnerInfo();
    }
    updateUser();
  };

  const updateCurrentChild = async (spinsAmount) => {
    setAnimationParams((animationParams) => ({
      ...animationParams,
      votesStart: currentChild.totalVotes,
      rankStart: currentChild.rank,
      levelStart: currentChild.level,
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
      levelEnd: entry.level,
      handleAnimationEnd: handleAnimationEnd(spinsAmount, entry),
    }));
  };

  const popupType = !user ? "spinner-not-login" : "spinner-not-entered";

  if (!currentChild?.currentCompetition) {
    return (
      <div className="no-entered" onClick={() => setIsPopupShown(true)}>
        <Spinner spinnerData={{ type: "free" }} />
        {isPopupShown && (
          <Popup handlePopupClose={() => history.push("/")} type={popupType} />
        )}
        <Footer active="spinner" />
      </div>
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

    return (
      <NoSpinner
        requestSpinnerInfo={requestSpinnerInfo}
        updateUser={updateUser}
        withAnimation={true}
      />
    );
  };

  return (
    <>
      <HeaderUser
        child={currentChild}
        animationParams={animationParams}
        handleAnimationEnd={animationParams?.handleAnimationEnd}
      />

      {renderSpinnerScreen()}

      <Footer active="spinner" />
    </>
  );
};

export default SpinnerPage;
