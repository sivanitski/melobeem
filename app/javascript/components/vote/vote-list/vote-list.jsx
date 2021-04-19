import "./style.less";

import propTypes from "prop-types";
import React, { useContext, useState } from "react";
import { withRouter } from "react-router";

import { api } from "../../../api";
import UserContext from "../../../helpers/user-context";
import HeartVote from "../../../images/heart-vote.svg";
import { Timer } from "../../timer";
import { VotePopup } from "../vote-popup";

// These options will be taken from the backend later
const voteOptions = [
  { price: "10", amount: "10" },
  { price: "20", amount: "20" },
  { price: "50", amount: "50" },
];

const VoteList = ({ childId, timeFreeVote, handlePriceClick, updateData }) => {
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [activeOption, setActiveOption] = useState(null);
  const { user } = useContext(UserContext);

  const handlePopupOpen = () => {
    setIsPopupShown(true);
  };

  const handlePopupClose = () => {
    setIsPopupShown(false);

    if (activeOption) {
      handlePriceClick(activeOption);
      setActiveOption(null);
    } else {
      updateData();
    }
  };

  const handleFreeVoteClick = async () => {
    handlePopupOpen();
    await api.post(`/entries/${childId}/votes/create_free`, {
      entryId: childId,
      value: 1,
      userId: user.id,
    });
  };

  const handlePaidClick = (clickedVoteOption) => {
    handlePopupOpen();
    setActiveOption(clickedVoteOption);
  };

  return (
    <div className="vote">
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

      {isPopupShown && (
        <VotePopup handlePopupClose={handlePopupClose} childId={childId} />
      )}
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
