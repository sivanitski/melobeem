import propTypes from "prop-types";
import React, { useEffect, useState } from "react";

import { getAnimationLevel, getVoteValueFromLevel } from "../../helpers/level";
import { HeartAnimationSmall } from "../heart-animation";
import HeartLevel from "../heart-animation/heart-level";
import LevelUpAnimation from "../heart-animation/level-up-animation";

const HeaderUserLevel = ({
  level,
  totalVotes,
  isAnimation,
  animationStep,
  setAnimationStep,
}) => {
  const animationLevel = getAnimationLevel(totalVotes, level);
  const [isLevelUpdated, setIsLevelUpdated] = useState(false);
  const [previousLevel, setPreviousLevel] = useState(false);

  if (isAnimation) {
    setTimeout(() => setAnimationStep(animationStep + 1), 3000);
  }

  useEffect(() => {
    if (previousLevel) {
      if (level > previousLevel) {
        setIsLevelUpdated(true);
        setPreviousLevel(level);
      }
    } else {
      setPreviousLevel(level);
    }
  }, [level]);

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
      {isLevelUpdated && <LevelUpAnimation />}
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
