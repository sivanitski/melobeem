import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, withRouter } from "react-router";

import { api } from "../../api";
import UserContext from "../../helpers/user-context";
import Loader from "../animation/loader";
import { Error } from "../error";
import { HeaderUserWithChild } from "../header-user-with-child";
import { Payment } from "../payment";
import { Popup } from "../popup";
import AnimationAfterPurchase from "./blocks/animation";
import VoteList from "./blocks/vote-list";

const Vote = ({
  match: {
    params: { id },
  },
}) => {
  const [isPopupShown, setIsPopupShown] = useState(false);
  const { user } = useContext(UserContext);
  const [timeVote, setTimeVote] = useState(null);
  const [isShowShareModal, setIsShowShareModal] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  if (!user) {
    return <Redirect to={`/entry/${id}`} />;
  }

  const [activeOption, setActiveOption] = useState({
    price: null,
    value: null,
    title: null,
    id: null,
  });
  const [currentPage, setCurrentPage] = useState("vote");

  const [animationParams, setAnimationParams] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    api.get("/users/show_share_modal").then((res) => {
      setIsShowShareModal(res?.data);
    });
  }, []);

  const getCurrentCompetitor = () => {
    return api.get(`/entries/${id}`);
  };

  const getFreeVoteTimer = () => {
    return api.get(`/entries/${id}/votes/expiration_time_for_free`);
  };

  const { data: child, error, loading } = useRequest(getCurrentCompetitor, {
    formatResult: (res) => res.data.entry,
  });

  if (child && !animationParams) {
    setAnimationParams((animationParams) => ({
      ...animationParams,
      votesStart: child.totalVotes,
      rankStart: child.rank,
      levelStart: child.level,
      level: child.level,
      rankEnd: child.rank,
      levelEnd: child.level,
      totalVotesEnd: child.totalVotes,
    }));
  }

  const {
    data: timeFreeVote,
    error: timeError,
    loading: timeLoading,
  } = useRequest(getFreeVoteTimer, {
    formatResult: (res) => res.data.ttlInSeconds,
  });

  if (error || timeError) {
    return <Error />;
  }
  if (loading || timeLoading) {
    return <Loader />;
  }

  const handlePriceClick = (option) => {
    setActiveOption(option);
    setCurrentPage("payment");
  };

  const updateTime = async () => {
    try {
      const {
        data: { ttlInSeconds },
      } = await api.get(`/entries/${id}/votes/expiration_time_for_free`);

      setTimeVote(ttlInSeconds);
    } catch (e) {
      setTimeVote(null);
    }
  };

  const handleGoToVoteOptions = async () => {
    setCurrentPage("vote");
    setActiveOption(null);
    updateTime();
  };

  const handlePopupClose = () => {
    setIsPopupShown(false);
  };

  const handleVoteSucceed = async (is_free = false) => {
    setAnimationParams((animationParams) => ({
      ...animationParams,
      votesStart: child.totalVotes,
      rankStart: child.rank,
      levelStart: child.level,
      level: child.level,
      rankEnd: child.rank,
      levelEnd: child.level,
      totalVotesEnd: child.totalVotes,
    }));

    const {
      data: { entry },
    } = await api.get(`/entries/${id}`);

    setTimeout(() => {
      child.totalVotes = entry.totalVotes;
      child.level = entry.level;
      child.rank = entry.rank;

      if (activeOption?.value) {
        setCurrentPage("animation");
      }

      setAnimationParams((animationParams) => ({
        ...animationParams,
        isAnimationPlay: true,
        votesEnd: entry.totalVotes,
        rankEnd: entry.rank,
        levelEnd: entry.level,
        totalVotesEnd: entry.totalVotes,
      }));

      updateTime();

      if (isShowShareModal && !activeOption.value && is_free) {
        setTimeout(() => setIsPopupShown(true), 5000);
        setIsShowShareModal(false);
      }
    }, 200);
  };

  const handleAnimationEnd = () => {
    if (currentPage === "animation") {
      setAnimationParams((animationParams) => ({
        ...animationParams,
        isAnimationPlay: false,
        votesStart: child.totalVotes,
        rankStart: child.rank,
        levelStart: child.level,
        level: child.level,
        rankEnd: child.rank,
        levelEnd: child.level,
        totalVotesEnd: child.totalVotes,
      }));
      setAnimationStep(0);
      setCurrentPage("vote");
    }
  };

  const renderVoteScreen = () => {
    if (currentPage === "vote") {
      return (
        <VoteList
          childId={child.id}
          timeFreeVote={timeVote || timeFreeVote}
          handlePriceClick={handlePriceClick}
          updateData={handleVoteSucceed}
        />
      );
    }

    if (currentPage === "payment") {
      return (
        <Payment
          activeType="vote"
          activePrice={activeOption.price}
          activeTitle={activeOption.title}
          activeId={activeOption.id}
          handlePaymentSucceedClose={handleVoteSucceed}
          handlePaymentClose={handleGoToVoteOptions}
          childId={child.id}
          userId={user.id}
        />
      );
    }

    if (currentPage === "animation") {
      return (
        <AnimationAfterPurchase
          value={activeOption.value}
          animationParams={animationParams}
        />
      );
    }

    return null;
  };

  return (
    <>
      <HeaderUserWithChild
        child={child}
        animationParams={animationParams}
        isGoToVoteList={currentPage !== "vote"}
        handleGoToVoteOptions={handleGoToVoteOptions}
        handleAnimationEnd={handleAnimationEnd}
        animationStep={animationStep}
        setAnimationStep={setAnimationStep}
        levelUpWrapperClass={"vote-level-up"}
        afterEndHandler={() => {
          setCurrentPage("vote");
        }}
      />

      {renderVoteScreen()}

      {isPopupShown && (
        <Popup
          handlePopupClose={handlePopupClose}
          linkId={child.id}
          name={child.name}
          image={child.imageUrl}
          type="vote"
        />
      )}
    </>
  );
};

Vote.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }),
};

export default withRouter(Vote);
