import "./style.less";

import propTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router";

import { api } from "../../../api";
import ChildContext from "../../../helpers/child-context";
import UserContext from "../../../helpers/user-context";
import HeartVote from "../../../images/heart-vote.svg";
import TimeMessage from "../../entry/blocks/time-fast-message";
import { InfoBlock } from "../../info-block";
import { Timer } from "../../timer";
import TimeMenu from "./time-menu";

const TIME_TITLE_INFO = "What is Time prize?";
const TIME_TEXT_INFO =
  "Free votes on this entry can now happen more frequently. Instead of 40 minutes it’s now every 30 minutes! (lasts 24h)";

// These options will be taken from the backend later
const voteOptions = [
  { price: "10", amount: "10" },
  { price: "20", amount: "20" },
  { price: "50", amount: "50" },
];

const VoteList = ({ childId, timeFreeVote, handlePriceClick, updateData }) => {
  const { user } = useContext(UserContext);
  const { currentChild } = useContext(ChildContext);
  const [prizeTime, setPrizeTime] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    if (currentChild.id === childId) {
      api.get(`/entries/${childId}/prize_time`).then((res) => {
        setPrizeTime(res?.data);
      });
    }
  }, []);

  const handleFreeVoteClick = async () => {
    await api.post(`/entries/${childId}/votes/create_free`, {
      entryId: childId,
      value: 1,
      userId: user.id,
    });
    updateData();
  };

  const handlePaidClick = (clickedVoteOption) => {
    handlePriceClick(clickedVoteOption);
  };

  return (
    <div className="vote">
      {prizeTime && (
        <>
          <TimeMenu
            time={prizeTime.message}
            value={prizeTime.value}
            handleInfoOpen={() => setIsInfoOpen(true)}
          />
          <TimeMessage value={prizeTime.value} />
        </>
      )}

      {isInfoOpen ? (
        <InfoBlock
          title={TIME_TITLE_INFO}
          text={TIME_TEXT_INFO}
          handleInfoClose={() => setIsInfoOpen(false)}
        />
      ) : (
        <div className="vote-item">
          <div className="vote-item__img">
            <HeartVote className="vote-item__img--free" />
          </div>

          <div className="vote-item__text">1 Vote</div>
          <Timer
            timeLeftInSeconds={timeFreeVote}
            handleFreeVoteClick={handleFreeVoteClick}
            type="votes"
          />
        </div>
      )}

      {voteOptions.map((voteOption) => (
        <div className="vote-item" key={voteOption.amount}>
          <div className="vote-item__img">
            <HeartVote className="vote-item__img--small" />
          </div>
          <div className="vote-item__text">{voteOption.amount} Votes</div>
          <div
            className="vote-item__button"
            onClick={() => handlePaidClick(voteOption)}
          >
            £ {voteOption.price}
          </div>
        </div>
      ))}
    </div>
  );
};

VoteList.propTypes = {
  timeFreeVote: propTypes.number.isRequired,
  childId: propTypes.number.isRequired,
  handlePriceClick: propTypes.func.isRequired,
  updateData: propTypes.func.isRequired,
};

export default withRouter(VoteList);
