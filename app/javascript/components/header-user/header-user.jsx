import "./style.less";

import propTypes from "prop-types";
import React, { useEffect, useState } from "react";

import defaultProptypes from "../../default-proptypes";
import { HeaderUserItem } from "../header-user-item";
import { HeaderUserLevel } from "../header-user-level";

const HeaderUser = ({ child, animationParams, handleAnimationEnd }) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (animationParams?.isAnimationPlay) {
      setAnimationStep(1);
    }
  }, [animationParams?.isAnimationPlay, animationParams?.votesEnd]);

  const calculateChildTotalVotes = () => {
    if (!animationParams?.isAnimationPlay) {
      return child.totalVotes;
    }

    return animationParams.votesEnd;
  };

  const calculateChildRank = () => {
    if (!animationParams?.isAnimationPlay) {
      return child.rank;
    }

    return animationParams.rankEnd;
  };

  const calculateLevelStart = () => {
    if (!animationParams?.isAnimationPlay) {
      return child.level;
    }

    return animationParams.levelStart;
  };

  const calculateTotalVotesStart = () => {
    if (!animationParams?.isAnimationPlay) {
      return child.totalVotes;
    }

    return animationParams.votesStart;
  };

  return (
    <div className="header-user">
      <div className="header-user__list">
        <HeaderUserItem
          title="Votes"
          value={calculateChildTotalVotes()}
          isAnimationPlay={animationStep === 1}
          numberStart={animationParams?.votesStart}
          numberEnd={animationParams?.votesEnd}
          animationStep={animationStep}
          setAnimationStep={setAnimationStep}
        />
        <HeaderUserLevel
          levelStart={calculateLevelStart()}
          levelEnd={
            animationParams?.isAnimationPlay
              ? animationParams?.levelEnd
              : child.level
          }
          totalVotesEnd={
            animationParams?.isAnimationPlay
              ? animationParams?.votesEnd
              : child.totalVotes
          }
          totalVotesStart={calculateTotalVotesStart()}
          isAnimation={animationStep === 2}
          animationStep={animationStep}
          setAnimationStep={setAnimationStep}
        />
        <HeaderUserItem
          title="Rank"
          isAnimationPlay={animationStep === 3}
          value={calculateChildRank()}
          numberStart={animationParams?.rankStart}
          numberEnd={animationParams?.rankEnd}
          isDecrease
          animationStep={animationStep}
          setAnimationStep={setAnimationStep}
          handleAnimationEnd={handleAnimationEnd}
        />
      </div>
    </div>
  );
};

HeaderUser.propTypes = {
  child: defaultProptypes.CHILD,
  animationParams: propTypes.shape({
    isAnimationPlay: propTypes.bool,
    votesStart: propTypes.number,
    votesEnd: propTypes.number,
    rankStart: propTypes.number,
    rankEnd: propTypes.number,
    levelStart: propTypes.number,
    levelEnd: propTypes.number,
  }),
  handleAnimationEnd: propTypes.func,
};

export default HeaderUser;
