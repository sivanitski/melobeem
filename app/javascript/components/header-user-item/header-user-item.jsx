import propTypes from "prop-types";
import React from "react";

import { CountAnimation } from "../count-animation";

const HeaderUserItem = ({ title, value, isAnimationPlay, ...countProps }) => {
  return (
    <div className="header-user__item">
      <div className="header-user__item__text text-tiny text-grey">{title}</div>
      <div className="header-user__item__number headline--medium text-pink">
        {isAnimationPlay ? <CountAnimation {...{ ...countProps }} /> : value}
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
};

export default HeaderUserItem;
