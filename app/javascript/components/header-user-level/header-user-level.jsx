import propTypes from "prop-types";
import React from "react";

import { LEVEL_INTERVALS } from "../../helpers/level";
import HeartRating from "../../images/heart-rating.svg";
const HeaderUserLevel = ({ level, totalVotes }) => {
  return (
    <div className="half-circle header-user__level">
      <div className="header-user__text text-grey text-tiny">
        Level {level} ({totalVotes}/{LEVEL_INTERVALS[level + 1]})
      </div>
      <HeartRating />
    </div>
  );
};

HeaderUserLevel.propTypes = {
  level: propTypes.number.isRequired,
  totalVotes: propTypes.number.isRequired,
};

export default HeaderUserLevel;
