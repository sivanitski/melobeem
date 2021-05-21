import propTypes from "prop-types";
import React from "react";

import PrizeIcon from "../../../images/first-prize-icon.svg";
import IconHeart from "../../../images/icon-heart.svg";

const PreviousCompetitionInfo = ({ competitionMoneyPrize, totalVotes }) => {
  return (
    <>
      {competitionMoneyPrize > 0 && (
        <PrizeIcon className="entry-previous__prize-icon" />
      )}
      <div className="entry-previous__text text-grey">
        finished competition with <br />
        <span className="text-pink">
          <IconHeart className="svg-pink" />
          {totalVotes} Votes
        </span>
      </div>
    </>
  );
};

PreviousCompetitionInfo.propTypes = {
  competitionMoneyPrize: propTypes.number.isRequired,
  totalVotes: propTypes.number.isRequired,
};

export default PreviousCompetitionInfo;
