import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useState } from "react";
import { withRouter } from "react-router";

import { createAPI } from "../../api";
import HeartVote from "../../images/heart-vote.svg";
import { Error } from "../error";
import { HeaderUserWithChild } from "../header-user-with-child";
import { Loading } from "../loading";
import { VotePopup } from "../vote-popup";
import { VoteTimer } from "../vote-timer";

// It will be removed here https://trello.com/c/vnnM0dlN . The date will be in Current User
const date = Date.now() + 20000;

const Vote = ({
  match: {
    params: { id },
  },
}) => {
  const api = createAPI();

  const getCurrentCompetitor = () => {
    return api.get(`/competitions/1/children/${id}`);
  };
  const [isPopupShown, setIsPopupShown] = useState(false);
  const { data: child, error, loading } = useRequest(getCurrentCompetitor, {
    formatResult: (res) => res.data,
  });

  const handlePrizeClick = () => {
    setIsPopupShown(true);
  };

  const handlePopupClose = () => {
    setIsPopupShown(false);
  };

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Loading />;
  }

  console.log(child);

  return (
    <>
      <HeaderUserWithChild child={child} />
      <div className="vote">
        <div className="vote-item">
          <div className="vote-item__img">
            <HeartVote className="vote-item__img--free" />
          </div>

          <div className="vote-item__text">1 Vote</div>
          <VoteTimer date={date} handlePrizeClick={handlePrizeClick} />
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
