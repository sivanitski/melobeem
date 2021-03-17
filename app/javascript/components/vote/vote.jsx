import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useContext, useState } from "react";
import { withRouter } from "react-router";

import { createAPI } from "../../api";
import UserContext from "../../helpers/user-context";
import HeartVote from "../../images/heart-vote.svg";
import { Error } from "../error";
import { HeaderUserWithChild } from "../header-user-with-child";
import { Loading } from "../loading";
import { VotePopup } from "../vote-popup";
import { VoteTimer } from "../vote-timer";

const Vote = ({
  match: {
    params: { id },
  },
}) => {
  const { user } = useContext(UserContext);
  const api = createAPI();

  const getCurrentCompetitor = () => {
    return api.get(`/entries/${id}`);
  };

  const getFreeVoteTimer = () => {
    return api.get(`/entries/${id}/votes/expiration_time_for_free`);
  };
  const [isPopupShown, setIsPopupShown] = useState(false);
  const { data: child, error, loading } = useRequest(getCurrentCompetitor, {
    formatResult: (res) => res.data.entry,
  });
  const {
    data: timeFreeVote,
    error: timeError,
    loading: timeLoading,
  } = useRequest(getFreeVoteTimer, {
    formatResult: (res) => res.data.ttlInSeconds,
  });

  const handlePrizeClick = () => {
    setIsPopupShown(true);
    api.post(`/entries/${id}/votes/create_free`, {
      entryId: id,
      value: 1,
      userId: user.id,
    });
  };

  const handlePopupClose = () => {
    setIsPopupShown(false);
  };

  if (error || timeError) {
    return <Error />;
  }
  if (loading || timeLoading) {
    return <Loading />;
  }

  return (
    <>
      <HeaderUserWithChild child={child} />
      <div className="vote">
        <div className="vote-item">
          <div className="vote-item__img">
            <HeartVote className="vote-item__img--free" />
          </div>

          <div className="vote-item__text">1 Vote</div>
          <VoteTimer
            timeLeftInSeconds={timeFreeVote}
            handlePrizeClick={handlePrizeClick}
          />
        </div>
        <div className="vote-item">
          <div className="vote-item__img">
            <HeartVote className="vote-item__img--small" />
          </div>
          <div className="vote-item__text">10 Votes</div>
          <div className="vote-item__button">£ 10</div>
        </div>
        <div className="vote-item">
          <div className="vote-item__img">
            <HeartVote className="vote-item__img--medium" />
          </div>
          <div className="vote-item__text">20 Votes</div>
          <div className="vote-item__button">£ 20</div>
        </div>
        <div className="vote-item">
          <div className="vote-item__img">
            <HeartVote className="vote-item__img--big" />
          </div>
          <div className="vote-item__text">50 Votes</div>
          <div className="vote-item__button">£ 50</div>
        </div>
      </div>

      {isPopupShown && <VotePopup handlePopupClose={handlePopupClose} />}
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
