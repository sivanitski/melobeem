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

    if (animationStep <= 2) {
      return animationParams.votesStart;
    }

    return animationParams.votesEnd;
  };

  const calculateChildRank = () => {
    if (!animationParams?.isAnimationPlay) {
      return child.rank;
    }

    if (animationStep <= 3) {
      return animationParams.rankStart;
    }

    return animationParams.rankEnd;
  };

  return (
    <div className="header-user">
      <div className="header-user__list">
        <HeaderUserItem
          title="Votes"
          value={calculateChildTotalVotes()}
          isAnimationPlay={animationStep === 2}
          numberStart={animationParams?.votesStart}
          numberEnd={animationParams?.votesEnd}
          animationStep={animationStep}
          setAnimationStep={setAnimationStep}
        />
        <HeaderUserLevel
          levelStart={animationParams?.levelStart}
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
          totalVotesStart={animationParams?.votesStart}
          isAnimation={animationStep === 1}
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
