import propTypes from "prop-types";
import React from "react";

import { getAnimationLevel, getVoteValueFromLevel } from "../../helpers/level";
import { HeartAnimationSmall } from "../heart-animation";
import HeartLevel from "../heart-animation/heart-level";

const HeaderUserLevel = ({
  level,
  totalVotes,
  isAnimation,
  animationStep,
  setAnimationStep,
}) => {
  const animationLevel = getAnimationLevel(totalVotes, level);

  if (isAnimation) {
    setTimeout(() => setAnimationStep(animationStep + 1), 2000);
  }

  return (
    <div className="half-circle header-user__level">
      <div className="header-user__text text-grey text-tiny">
        Level {level} ({totalVotes}/{getVoteValueFromLevel(level + 1)})
      </div>
      {isAnimation ? (
        <HeartAnimationSmall animationLevel={animationLevel} />
      ) : (
        <HeartLevel animationLevel={animationLevel} />
      )}
    </div>
  );
};

HeaderUserLevel.propTypes = {
  level: propTypes.number.isRequired,
  totalVotes: propTypes.number.isRequired,
  isAnimation: propTypes.bool,
  setAnimationStep: propTypes.func,
  animationStep: propTypes.number,
};

export default HeaderUserLevel;
