import "./style.less";

import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";

import {
  calcTimeDuration,
  formatTimeInMinutesAndSeconds,
} from "../../helpers/date";
import HeartVote from "../../images/heart-vote.svg";
import { HeaderUser } from "../header-user";

// It will be removed here https://trello.com/c/vnnM0dlN . The date will be in Current User
const date = Date.now() + 30000;

const Vote = ({}) => {
  const [timeLeft, setTimeLeft] = useState(calcTimeDuration(date));
  useEffect(() => {
    if (timeLeft <= 0) {
      return () => {};
    }

    const timer = setTimeout(() => {
      setTimeLeft(calcTimeDuration(date));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft]);

  return (
    <>
      <HeaderUser />
      <div className="vote">
        <div className="vote-item">
          <div className="vote-item__img">
            <HeartVote className="vote-item__img--free" />
          </div>

          <div className="vote-item__text">1 Vote</div>
          <div
            className={`vote-item__button ${
              timeLeft > 0 ? `vote-item__button--orange` : ``
            }`}
          >
            {timeLeft > 0 ? formatTimeInMinutesAndSeconds(timeLeft) : "Free"}
          </div>
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
    </>
  );
};

export default withRouter(Vote);
