import propTypes from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ChildContext from "../../../helpers/child-context";
import UserContext from "../../../helpers/user-context";
import PrizeIcon from "../../../images/first-prize-icon.svg";
import IconHeart from "../../../images/icon-heart.svg";

const PreviousCompetitionInfo = ({
  competitionMoneyPrize,
  totalVotes,
  userId,
}) => {
  const { currentChild } = useContext(ChildContext);
  const { user } = useContext(UserContext);

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

      {!currentChild && user?.id === userId && (
        <Link to="/sign-up" className="entry-previous__enter">
          Enter again
        </Link>
      )}
    </>
  );
};

PreviousCompetitionInfo.propTypes = {
  competitionMoneyPrize: propTypes.number.isRequired,
  totalVotes: propTypes.number.isRequired,
  userId: propTypes.number.isRequired,
};

export default PreviousCompetitionInfo;
