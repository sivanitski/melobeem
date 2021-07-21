import "./style.less";

import propTypes from "prop-types";
import React, { useEffect, useRef } from "react";

const CountAnimation = ({
  numberStart,
  numberEnd,
  isDecrease,
  animationStep,
  setAnimationStep,
  handleAnimationEnd,
}) => {
  const listElement = useRef(null);

  if (isDecrease) {
    [numberStart, numberEnd] = [numberEnd, numberStart];
  }
  const range = numberEnd - numberStart;
  const duration = range > 5 ? 3000 : 1000;

  useEffect(() => {
    playAnimation();
  }, []);

  const TRANSFORM_QUANTITY = isDecrease ? `0px` : `calc(-100% + 30px)`;
  const playAnimation = () => {
    listElement.current.animate(
      [{ transform: `translateY(${TRANSFORM_QUANTITY})` }],
      {
        duration,
        fill: "forwards",
      }
    );

    setTimeout(() => {
      if (animationStep) {
        if (animationStep === 3) {
          setAnimationStep(0);
        }
        if (handleAnimationEnd) {
          handleAnimationEnd();
        }
        setAnimationStep(animationStep + 1);
      }
    }, duration);
  };

  const renderNumber = () => {
    let allNumbers = [];

    if (numberEnd === numberStart) {
      return <span className="count__item">{numberEnd}</span>;
    }

    let i = numberStart;
    const increasingNumber =
      range > 10 ? Math.trunc((numberEnd - numberStart) / 10) : 1;

    while (i < numberEnd) {
      allNumbers.push(
        <span className="count__item" key={`count-item-${i}`}>
          {i}
        </span>
      );
      i += increasingNumber;
    }

    allNumbers.push(
      <span className="count__item" key={`count-item-${i}`}>
        {numberEnd}
      </span>
    );

    return <>{allNumbers}</>;
  };

  return (
    <div className="count__wrapper">
      <div
        ref={listElement}
        className={`header-user__item__number headline--medium text-pink count__list ${
          isDecrease && "count__list--decrease"
        }`}
      >
        {renderNumber()}
      </div>
    </div>
  );
};

CountAnimation.propTypes = {
  numberEnd: propTypes.number,
  numberStart: propTypes.number,
  isDecrease: propTypes.bool,
  animationStep: propTypes.number,
  setAnimationStep: propTypes.func,
  handleAnimationEnd: propTypes.func,
};

export default CountAnimation;
