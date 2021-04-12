import propTypes from "prop-types";
import React from "react";

import { getAnimationLevel, getVoteValueFromLevel } from "../../helpers/level";
import { HeartAnimationSmall } from "../heart-animation";

const HeaderUserLevel = ({ level, totalVotes }) => {
  const animationLevel = getAnimationLevel(totalVotes, level);

  return (
    <div className="half-circle header-user__level">
      <div className="header-user__text text-grey text-tiny">
        Level {level} ({totalVotes}/{getVoteValueFromLevel(level + 1)})
      </div>
      <HeartAnimationSmall animationLevel={animationLevel} />
    </div>
  );
};

HeaderUserLevel.propTypes = {
  level: propTypes.number.isRequired,
  totalVotes: propTypes.number.isRequired,
};

export default HeaderUserLevel;
