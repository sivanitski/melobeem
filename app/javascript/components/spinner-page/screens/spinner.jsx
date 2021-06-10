import "./style.less";

import propTypes from "prop-types";
import React, { useRef, useState } from "react";

import { api } from "../../../api";
import {
  calcSecondAnimationParameters,
  FIRST_ANIMATION_TIME,
  FULL_ROUND,
} from "../../../helpers/spinner";
import SpinnerStartImage from "../../../images/spinner-start.svg";
import SpinnerStopImage from "../../../images/spinner-stop.svg";
import SpinnerPointer from "../../../images/stopper.svg";
import SpinnerImageColor from "../blocks/spinner-image";
import SpinnerTitle from "../blocks/spinner-title";

const Spinner = ({ spinnerData, updateCurrentChild, updateUser }) => {
  const spinnerElement = useRef(null);
  const [isAnimationPlay, setIsAnimationPlay] = useState(false);
  const [spinnerAnimation, setSpinnerAnimation] = useState(null);
  const [amount, setAmount] = useState(spinnerData?.count);

  const startAnimation = () => {
    const animation = spinnerElement.current.animate(
      [{ transform: `rotate(${FULL_ROUND}deg)` }],
      {
        duration: FIRST_ANIMATION_TIME,
        iterations: Infinity,
        fill: "forwards",
      }
    );
    setIsAnimationPlay(true);
    setSpinnerAnimation(animation);
  };

  const beginToStopAnimation = async () => {
    if (!spinnerAnimation) {
      return;
    }

    const res = await api.post("/spins");

    spinnerAnimation.pause();

    const animationParams = calcSecondAnimationParameters(
      spinnerAnimation.currentTime,
      res.data.value
    );

    spinnerAnimation.cancel();
    spinnerElement.current.style.transform = `rotate(${animationParams.currentAngle}deg)`;

    spinnerElement.current.animate(
      [{ transform: `rotate(${animationParams.endAngle}deg)` }],
      {
        fill: "forwards",
        duration: animationParams.secondAnimationTime,
        easing: "ease",
      }
    );

    if (amount) {
      setAmount(amount - 1);
    }

    setSpinnerAnimation(null);

    setTimeout(updateCurrentChild, animationParams.secondAnimationTime);
    setTimeout(updateUser, animationParams.secondAnimationTime);
  };

  return (
    <div className="spinner">
      <SpinnerTitle spinnerType={spinnerData.type} spinnerAmount={amount} />

      <div className="spinner__image">
        <SpinnerPointer className="spinner__pointer" />
        <div ref={spinnerElement} className="spinner__svg">
          <SpinnerImageColor
            spinnerType={spinnerData.type}
            spinnerAmount={spinnerData.count}
          />
        </div>

        <div className="spinner__button">
          {isAnimationPlay ? (
            <SpinnerStopImage onClick={beginToStopAnimation} />
          ) : (
            <SpinnerStartImage onClick={startAnimation} />
          )}
        </div>
      </div>
    </div>
  );
};

Spinner.propTypes = {
  spinnerData: propTypes.shape({
    type: propTypes.string.isRequired,
    count: propTypes.number,
  }),
  updateCurrentChild: propTypes.func,
  updateUser: propTypes.func,
};

export default Spinner;
