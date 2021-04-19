import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useContext, useState } from "react";
import { Redirect, withRouter } from "react-router";

import { api } from "../../api";
import UserContext from "../../helpers/user-context";
import { Error } from "../error";
import { HeaderUserWithChild } from "../header-user-with-child";
import { Loading } from "../loading";
import { Payment } from "../payment";
import { VoteList } from "./vote-list";

const Vote = ({
  match: {
    params: { id },
  },
}) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Redirect to={`/entry/${id}`} />;
  }
  const [activeOption, setActiveOption] = useState({
    price: null,
    amount: null,
  });
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const getCurrentCompetitor = () => {
    return api.get(`/entries/${id}`);
  };

  const getFreeVoteTimer = () => {
    return api.get(`/entries/${id}/votes/expiration_time_for_free`);
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

  if (error || timeError) {
    return <Error />;
  }
  if (loading || timeLoading) {
    return <Loading />;
  }

  const handlePriceClick = (option) => {
    setActiveOption(option);
    setIsPaymentOpen(true);
  };

  const handlePaymentClose = () => {
    setIsPaymentOpen(false);
    setActiveOption(null);
  };

  const updateData = () => {
    requestTimeFreeVote();
    requestChild();
  };

  return (
    <>
      <HeaderUserWithChild child={child} />

      {isPaymentOpen ? (
        <Payment
          activeType="vote"
          activePrice={activeOption.price}
          activeAmount={activeOption.amount}
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
