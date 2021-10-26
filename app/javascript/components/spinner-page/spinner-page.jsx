import { useRequest } from "ahooks";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

import { api } from "../../api";
import ChildContext from "../../helpers/child-context";
import UserContext from "../../helpers/user-context";
import { Error } from "../error";
import { Footer } from "../footer";
import { HeaderUser } from "../header-user";
import SpinnerLoader from "../loaders/spinner-loader";
import { Popup } from "../popup";
import NoSpinner from "./screens/no-spinner";
import Spinner from "./screens/spinner";

const SpinnerPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [isLvlUp, setIsLvlUp] = useState(false);
  const [isRankUp, setIsRankUp] = useState(false);

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

  // useEffect(() => {
  //   console.log('currentChild', currentChild)
  // }, [currentChild])

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

  const getUserParams = async () => {
    const {
      data: { entry },
    } = await api.get("/entries/current");

    setIsLvlUp(currentChild.level !== entry.level);
    setIsRankUp(currentChild.rank !== entry.rank);

    return {
      entry: entry,
      votesStart: currentChild.totalVotes,
      rankStart: currentChild.rank,
      levelStart: currentChild.level,
      votesEnd: entry.totalVotes,
      levelEnd: entry.level,
      rankEnd: entry.rank,
    };
  };

  const updateCurrentChild = (spinsAmount, entry) => {
    setAnimationParams((animationParams) => ({
      ...animationParams,
      isAnimationPlay: true,

      votesStart: currentChild.totalVotes,
      rankStart: currentChild.rank,
      levelStart: currentChild.level,

      votesEnd: entry.totalVotes,
      level: entry.level,
      levelEnd: entry.level,
      // rankEnd: currentChild.rank,
      rankEnd: entry.rank,
      totalVotesEnd: entry.totalVotes,
      // handleAnimationEnd: handleAnimationEnd(spinsAmount, entry),
    }));

    // setTimeout(() => {
    //   setAnimationParams((animationParams) => ({
    //     ...animationParams,
    //     rankEnd: entry.rank,
    //   }));
    // }, 7000);
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
      return <SpinnerLoader />;
    }

    if (data.type) {
      return (
        <Spinner
          handleAnimationEnd={handleAnimationEnd}
          spinnerData={data}
          animationParams={animationParams}
          getUserParams={getUserParams}
          updateCurrentChild={updateCurrentChild}
        />
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
        // handleAnimationEnd={() => {console.log('handle end');}}
        // handleAnimationEnd={animationParams?.handleAnimationEnd}
        isLvlUp={isLvlUp}
        isRankUp={isRankUp}
      />

      {renderSpinnerScreen()}

      <Footer active="spinner" />
    </>
  );
};

export default SpinnerPage;
