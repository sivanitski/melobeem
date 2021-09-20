import "./style.less";

import propTypes from "prop-types";
import React, { useState } from "react";

import defaultProptypes from "../../default-proptypes";
import { HeaderUserItem } from "../header-user-item";
import { HeaderUserLevel } from "../header-user-level";

const HeaderUser = ({ child, animationParams, isLvlUp }) => {
  const [animationStep, setAnimationStep] = useState(0);

  // useEffect(() => {
  //   if (animationParams?.isAnimationPlay) {

  //     // console.log('PLAY callbacks from header');

  //     // setAnimationStep(1);
  //   }
  // }, [animationParams?.isAnimationPlay, animationParams?.votesEnd]);

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
          title="vote"
          value={calculateChildTotalVotes()}
          isAnimationPlay={animationParams?.isAnimationPlay}
          numberStart={animationParams?.votesStart}
          numberEnd={animationParams?.votesEnd}
          animationStep={animationStep}
          setAnimationStep={setAnimationStep}
          typeOfPage={"spinner"}
          duration={1000}
          animationParams={animationParams}
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
          isAnimation={animationParams?.isAnimationPlay}
          animationStep={animationStep}
          setAnimationStep={setAnimationStep}
          animationParams={animationParams}
          isLvlUp={isLvlUp}
        />
        <HeaderUserItem
          title="rank"
          isAnimationPlay={animationParams?.isAnimationPlay}
          value={calculateChildRank()}
          numberStart={animationParams?.rankStart}
          numberEnd={animationParams?.rankEnd}
          animationStep={animationStep}
          setAnimationStep={setAnimationStep}
          animationParams={animationParams}
          typeOfPage={"spinner"}
          duration={200}
        />
      </div>
    </div>
  );
};

HeaderUser.propTypes = {
  child: defaultProptypes.CHILD,
  isLvlUp: propTypes.bool,
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
