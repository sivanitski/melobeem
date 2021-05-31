import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useContext, useState } from "react";
import { Redirect, withRouter } from "react-router";

import { api } from "../../api";
import ChildContext from "../../helpers/child-context";
import UserContext from "../../helpers/user-context";
import Loader from "../animation/loader";
import { Error } from "../error";
import { HeaderUserWithChild } from "../header-user-with-child";
import { Payment } from "../payment";
import VoteList from "./blocks/vote-list";
import { VotePopup } from "./vote-popup";

const Vote = ({
  match: {
    params: { id },
  },
}) => {
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { currentChild, setCurrentChild } = useContext(ChildContext);

  if (!user) {
    return <Redirect to={`/entry/${id}`} />;
  }
  const [activeOption, setActiveOption] = useState({
    price: null,
    value: null,
    title: null,
    id: null,
  });
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const getCurrentCompetitor = () => {
    return api.get(`/entries/${id}`);
  };

  const getFreeVoteTimer = () => {
    return api.get(`/entries/${id}/votes/expiration_time_for_free`);
  };

  const getIsShowPopup = () => {
    return api.get("/users/show_share_modal");
  };

  const { data: child, error, loading, run: requestChild } = useRequest(
    getCurrentCompetitor,
    {
      formatResult: (res) => res.data.entry,
    }
  );

  const {
    data: timeFreeVote,
    error: timeError,
    loading: timeLoading,
    run: requestTimeFreeVote,
  } = useRequest(getFreeVoteTimer, {
    formatResult: (res) => res.data.ttlInSeconds,
  });

  const { data: isPopup, loading: isPopupLoading } = useRequest(
    getIsShowPopup,
    {
      formatResult: (res) => res.data,
    }
  );

  if (error || timeError) {
    return <Error />;
  }
  if (loading || timeLoading || isPopupLoading) {
    return <Loader />;
  }

  const handlePriceClick = (option) => {
    setActiveOption(option);
    setIsPaymentOpen(true);
  };

  const handlePaymentClose = () => {
    setIsPaymentOpen(false);
    setActiveOption(null);
  };

  const handlePopupClose = () => {
    setIsPopupShown(false);
  };

  const updateStateAfterVote = async () => {
    requestChild();
    setIsAnimation(true);

    if (currentChild?.id === Number(id)) {
      const {
        data: { entry },
      } = await api.get("/entries/current");
      setCurrentChild(entry);
    }

    if (isPopup) {
      setTimeout(() => setIsPopupShown(true), 3000);
    }

    const {
      data: { user },
    } = api.get("/users/current");
    setUser(user);
  };

  const handlePaymentSucceedClose = async () => {
    handlePaymentClose();
    updateStateAfterVote();
  };

  const updateData = async () => {
    requestTimeFreeVote();
    updateStateAfterVote();
  };

  return (
    <>
      <HeaderUserWithChild child={child} isAnimation={isAnimation} />

      {isPaymentOpen ? (
        <Payment
          activeType="vote"
          activePrice={activeOption.price}
          activeTitle={activeOption.title}
          activeId={activeOption.id}
          handlePaymentSucceedClose={handlePaymentSucceedClose}
          handlePaymentClose={handlePaymentClose}
          childId={child.id}
          userId={user.id}
        />
      ) : (
        <VoteList
          childId={child.id}
          timeFreeVote={timeFreeVote}
          handlePriceClick={handlePriceClick}
          updateData={updateData}
        />
      )}

      {isPopupShown && (
        <VotePopup
          handlePopupClose={handlePopupClose}
          childId={child.id}
          childName={child.name}
          childImage={child.imageUrl}
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
