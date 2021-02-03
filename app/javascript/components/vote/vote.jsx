import "./style.less";

import propTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";

import {
  calcTimeDuration,
  formatTimeInMinutesAndSeconds,
} from "../../helpers/date";
import HeartVote from "../../images/heart-vote.svg";
import { HeaderUser } from "../header-user";

const Vote = ({
  location: { propsSearch: child },
  match: {
    params: { id },
  },
}) => {
  // The date will be in Current User, when he exists
  const date = new Date("February 04, 2021 00:07:00");
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

  if (!child) return <Redirect to={`/entry/${id}`} />;

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
              timeLeft <= 0 ? `` : `vote-item__button--orange`
            }`}
          >
            {timeLeft <= 0 ? "Free" : formatTimeInMinutesAndSeconds(timeLeft)}
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

Vote.propTypes = {
  location: propTypes.shape({
    propsSearch: propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      avatar: propTypes.string.isRequired,
      likes: propTypes.number.isRequired,
      parentName: propTypes.string.isRequired,
      rank: propTypes.number.isRequired,
    }),
  }),
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }),
};

export default withRouter(Vote);
