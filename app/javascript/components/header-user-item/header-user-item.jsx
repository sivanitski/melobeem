import propTypes from "prop-types";
import React from "react";

import { CountAnimation } from "../count-animation";

const HeaderUserItem = ({
  title,
  value,
  isAnimationPlay,
  animationStep,
  handleAnimationEnd,
  numberStart,
  numberEnd,
  ...countProps
}) => {
  if (animationStep === 3 && handleAnimationEnd) {
    const time = numberEnd - numberStart > 10 ? 3000 : 1500;
    setTimeout(handleAnimationEnd, time);
  }

  return (
    <div className="header-user__item">
      <div className="header-user__item__text text-tiny text-grey">{title}</div>
      <div className="header-user__item__number headline--medium text-pink">
        {isAnimationPlay && numberStart !== numberEnd ? (
          <CountAnimation
            animationStep={animationStep}
            numberStart={numberStart}
            numberEnd={numberEnd}
            {...{ ...countProps }}
          />
        ) : (
          value
        )}
      </div>
    </div>
  );
};

HeaderUserItem.propTypes = {
  title: propTypes.string.isRequired,
  value: propTypes.number.isRequired,
  isAnimationPlay: propTypes.bool,
  numberStart: propTypes.number,
  numberEnd: propTypes.number,
  isDecrease: propTypes.bool,
  animationStep: propTypes.number,
  setAnimationStep: propTypes.func,
  handleAnimationEnd: propTypes.func,
};

export default HeaderUserItem;
