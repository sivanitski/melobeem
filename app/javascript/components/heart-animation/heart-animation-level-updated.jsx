import propTypes from "prop-types";
import React, { useEffect, useState } from "react";

import HeartAnimationLevelUpdated1 from "./heart-animation-level-updated-1";
import HeartAnimationLevelUpdated2 from "./heart-animation-level-updated-2";
import HeartAnimationLevelUpdated3 from "./heart-animation-level-updated-3";

const HeartAnimationLevelUpdated = ({
  animationLevelStart,
  animationLevelEnd,
  levelStart,
  levelEnd,
}) => {
  const TOTAL_DURATION = 3;
  const levelDiff = levelEnd - levelStart;
  const stepDuration = TOTAL_DURATION / levelDiff;

  const repeatSecondStep = levelDiff - 2 > 0 ? levelDiff - 2 : 0;

  const [step, setStep] = useState(1);

  const elements = {
    1: (
      <HeartAnimationLevelUpdated1
        duration={stepDuration}
        levelEnd={animationLevelStart}
      />
    ),
    2: (
      <HeartAnimationLevelUpdated2
        duration={stepDuration}
        repeat={repeatSecondStep}
      />
    ),
    3: (
      <HeartAnimationLevelUpdated3
        duration={stepDuration}
        levelEnd={animationLevelEnd}
      />
    ),
  };

  useEffect(() => {
    if (step === 1) {
      setTimeout(() => setStep(2), stepDuration * 1000);
    }

    if (step === 2) {
      setTimeout(() => setStep(3), repeatSecondStep * stepDuration * 1000);
    }
  }, [step]);

  return <>{elements[step]}</>;
};

HeartAnimationLevelUpdated.propTypes = {
  animationLevelStart: propTypes.number.isRequired,
  animationLevelEnd: propTypes.number.isRequired,
  levelStart: propTypes.number.isRequired,
  levelEnd: propTypes.number.isRequired,
};

export default HeartAnimationLevelUpdated;
