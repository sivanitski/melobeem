import propTypes from "prop-types";
import React, { useEffect, useState } from "react";

const Count = ({
  numberStart,
  numberEnd,
  duration,
  isDecrease,
  animationStep,
  setAnimationStep,
}) => {
  const [count, setCount] = useState(numberStart);

  useEffect(() => {
    let start = numberStart;
    const end = numberEnd;

    if (start === end) return;

    let totalMilSecDur = duration;
    const stepDiff = isDecrease ? start - end : end - start;
    let incrementTime = (totalMilSecDur / stepDiff) * 1000;

    let timer = setInterval(() => {
      if (isDecrease) {
        start -= 1;
      } else {
        start += 1;
      }

      setCount(start);
      if (start === end) {
        if (animationStep) {
          setAnimationStep(animationStep + 1);
        }
        clearInterval(timer);
      }
    }, incrementTime);
  }, [numberEnd, duration]);

  return <span className="count">{count}</span>;
};

Count.propTypes = {
  numberEnd: propTypes.number,
  numberStart: propTypes.number,
  duration: propTypes.number.isRequired,
  isDecrease: propTypes.bool,
  animationStep: propTypes.number,
  setAnimationStep: propTypes.func,
};

export default Count;
