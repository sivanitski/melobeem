import propTypes from "prop-types";
import React from "react";

import { CountAnimation } from "../count-animation";

const HeaderUserItem = ({
  title,
  value,
  isAnimationPlay,
  animationStep,
  numberStart,
  numberEnd,
  setAnimationStep,
  handleAnimationEnd,
  animationParams,
  typeOfPage,
  ...countProps
}) => {
  if (isAnimationPlay && numberStart === numberEnd && title === "Rank") {
    if (handleAnimationEnd) {
      // handleAnimationEnd();
    }
  }

  return (
    <div className="header-user__item">
      <div className="header-user__item__text text-tiny text-grey">{title}</div>
      <div className="header-user__item__number headline--medium text-pink">
        {/* {isAnimationPlay && numberStart !== numberEnd ? ( */}
        <CountAnimation
          animationStep={animationStep}
          numberStart={numberStart === numberEnd ? value : numberStart}
          numberEnd={numberStart === numberEnd ? value : numberEnd}
          setAnimationStep={setAnimationStep}
          handleAnimationEnd={handleAnimationEnd}
          value={value}
          typeOfPage={typeOfPage}
          title={title}
          animationParams={animationParams}
          {...{ ...countProps }}
        />
        {/* ) : (
          value
        )} */}
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
  delay: propTypes.number,
  duration: propTypes.number,
  animationParams: propTypes.object,
  typeOfPage: propTypes.string,
  isDecrease: propTypes.bool,
  animationStep: propTypes.number,
  setAnimationStep: propTypes.func,
  handleAnimationEnd: propTypes.func,
};
CountAnimation.defaultProps = {
  delay: 0,
  duration: 1000,
};

export default HeaderUserItem;
