import propTypes from "prop-types";
import React from "react";
import { useState } from "react/cjs/react.development";

import defaultProptypes from "../../../default-proptypes";
import VotePrizeAnimation from "../../animation/vote-prize-level";
import { CountAnimation } from "../../count-animation";
import { HeaderUserWithChild } from "../../header-user-with-child";

const AnimationVote = ({ animationParams, child, setAnimationParams }) => {
  const [animationStep, setAnimationStep] = useState(0);

  return (
    <>
      <HeaderUserWithChild
        child={child}
        animationParams={animationParams}
        animationStep={animationStep}
        setAnimationStep={setAnimationStep}
        handleAnimationEnd={() =>
          setAnimationParams((animationParams) => ({
            ...animationParams,
            isAnimationPlay: false,
          }))
        }
      />

      <VotePrizeAnimation number={animationParams.value} />

      <div className="vote-animation__text headline--medium">
        <div className="vote-animation__title text-pink">
          <CountAnimation
            numberStart={animationParams.value}
            numberEnd={0}
            animationParams={animationParams}
            title={"vote"}
            typeOfPage={"level"}
          />
        </div>
        <div className="vote-animation__subtitle text-grey">votes</div>
      </div>
    </>
  );
};

AnimationVote.propTypes = {
  child: defaultProptypes.CHILD,
  animationParams: propTypes.shape({
    isAnimationPlay: propTypes.bool,
    votesStart: propTypes.number,
    votesEnd: propTypes.number,
    rankStart: propTypes.number,
    rankEnd: propTypes.number,
    level: propTypes.number,
    value: propTypes.number,
  }),
  value: propTypes.number.isRequired,
  setAnimationParams: propTypes.func.isRequired,
};

export default AnimationVote;
