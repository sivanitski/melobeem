import propTypes from "prop-types";
import React from "react";

import { getAnimationLevel, getVoteValueFromLevel } from "../../helpers/level";
import { HeartAnimationSmall } from "../heart-animation";
import HeartAnimationLevelUpdated from "../heart-animation/heart-animation-level-updated";
import HeartLevel from "../heart-animation/heart-level";
import LevelUpAnimation from "../heart-animation/level-up-animation";

const HeaderUserLevel = ({
  levelStart,
  levelEnd,
  totalVotesEnd,
  totalVotesStart,
  isAnimation,
  animationStep,
  setAnimationStep,
  levelUpWrapperClass,
}) => {
  if (isAnimation) {
    setTimeout(() => setAnimationStep(animationStep + 1), 3000);
  }

  const animationLevelStart = getAnimationLevel(totalVotesStart, levelStart);
  const animationLevelEnd = getAnimationLevel(totalVotesEnd, levelEnd);
  let normalHeartLevel =
    animationStep === 1 ? animationLevelStart : animationLevelEnd;
  let levelTo = levelEnd === 1 ? 1 : levelEnd + 1;

  return (
    <div className="half-circle header-user__level">
      <div className="header-user__text text-grey text-tiny">
        Level {levelEnd} ({totalVotesEnd}/{getVoteValueFromLevel(levelTo)})
      </div>

      {isAnimation ? (
        levelEnd > levelStart ? (
          <HeartAnimationLevelUpdated
            animationLevelStart={animationLevelStart}
            animationLevelEnd={animationLevelEnd}
            levelStart={levelStart}
            levelEnd={levelEnd}
          />
        ) : (
          <HeartAnimationSmall
            animationLevelStart={animationLevelStart}
            animationLevelEnd={animationLevelEnd}
          />
        )
      ) : (
        <HeartLevel animationLevel={normalHeartLevel} />
      )}

      {isAnimation &&
        levelEnd > levelStart &&
        (levelUpWrapperClass ? (
          <div className={levelUpWrapperClass}>
            <LevelUpAnimation />
          </div>
        ) : (
          <LevelUpAnimation />
        ))}
    </div>
  );
};

HeaderUserLevel.propTypes = {
  levelStart: propTypes.number,
  levelEnd: propTypes.number.isRequired,
  totalVotesEnd: propTypes.number.isRequired,
  totalVotesStart: propTypes.number,
  isAnimation: propTypes.bool,
  setAnimationStep: propTypes.func,
  animationStep: propTypes.number,
  levelUpWrapperClass: propTypes.string,
};

export default HeaderUserLevel;
