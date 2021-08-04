import "./style.less";

import { gsap } from "gsap";
import propTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

import { api } from "../../../api";
import { calculateAnimationAngle, FULL_ROUND } from "../../../helpers/spinner";
import SpinnerStopImage from "../../../images/spinner-stop.svg";
import SpinnerPointer from "../../../images/stopper.svg";
import SpinnerPrizeAnimation from "../../animation/spinner-prize-animation";
import SpinnerImageColor from "../blocks/spinner-image";
import SpinnerTitle from "../blocks/spinner-title";

const Spinner = ({ spinnerData, updateCurrentChild }) => {
  const spinnerElement = useRef(null);
  const [isAnimationPlay, setIsAnimationPlay] = useState(false);
  const [spinnerAnimation, setSpinnerAnimation] = useState(null);
  const [amount, setAmount] = useState(spinnerData?.count);
  const [isSpinnerDone, setIsSpinnerDone] = useState(false);
  const [winningAmount, setWinningAmount] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [slowDownStopper, setSlowDownStopper] = useState(false);
  const [zoomOutSpinner, setZoomOutSpinner] = useState(false);
  const [storedAngle, setStoredAngle] = useState(0);
  const [isFinalAnimationStarted, setIsFinalAnimationStarted] = useState(false);

  const startAnimation = () => {
    if (spinnerAnimation && spinnerAnimation.paused()) {
      spinnerAnimation.invalidate();
    }

    const animation = gsap.fromTo(
      spinnerElement.current,
      {
        rotation: storedAngle,
      },
      {
        rotation: storedAngle + FULL_ROUND,
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      }
    );

    setSpinnerAnimation(animation);
    setIsAnimationPlay(true);
    setIsSpinnerDone(false);
  };

  useEffect(() => {
    if (spinnerElement.current) {
      startAnimation();
    }
  }, []);

  const beginToStopAnimation = async () => {
    if (!spinnerAnimation) {
      return;
    }

    if (isFinalAnimationStarted) {
      return;
    }

    setIsFinalAnimationStarted(true);

    const res = await api.post("/spins");

    const endAngle = calculateAnimationAngle(res.data.value);

    setStoredAngle(endAngle);
    setSlowDownStopper(true);

    let stopAngle = 2 * FULL_ROUND + endAngle;

    const spinnerDuration = (2 * 1.7 * (stopAngle - endAngle)) / 360;

    gsap.to(spinnerElement.current, {
      rotate: stopAngle,
      duration: spinnerDuration,
      repeat: 0,
      ease: "ease-out",
      overwrite: true,
      onComplete: () => {
        finalAnimation(res.data.value);
        setTimeout(() => updateCurrentChild(amount - 1), 2000);
      },
    });
  };

  const finalAnimation = (prizeAmount) => {
    spinnerAnimation.pause();

    if (amount) {
      setAmount(amount - 1);
    }

    setIsAnimationPlay(false);

    setIsSpinnerDone(true);
    setSlowDownStopper(false);

    setTimeout(() => {
      setWinningAmount(prizeAmount);
    }, 1000);
  };

  useEffect(() => {
    if (isSpinnerDone && !animationCompleted) {
      setTimeout(() => {
        setAnimationCompleted(true);
      }, 8500);
    }

    if (animationCompleted) {
      if (amount === 0 || !amount) {
        setZoomOutSpinner(true);
      } else {
        setAnimationCompleted(null);
        setWinningAmount(false);
        setIsSpinnerDone(false);
        setZoomOutSpinner(false);
        setIsFinalAnimationStarted(false);
        startAnimation();
      }
    }
  }, [isSpinnerDone, animationCompleted]);

  return (
    <div className={`spinner ${zoomOutSpinner && "spinner-zoom-out"}`}>
      <SpinnerTitle spinnerType={spinnerData.type} spinnerAmount={amount} />

      <div className="spinner__image">
        <SpinnerPointer
          className={`spinner__pointer ${
            isAnimationPlay && "spinner__pointer-animation"
          } ${slowDownStopper && "spinner__pointer-animation-slow"}`}
        />
        <div className="parent_spinner-container">
          <div ref={spinnerElement} className="spinner__svg">
            <SpinnerImageColor
              spinnerType={spinnerData.type}
              spinnerAmount={spinnerData.count}
            />
          </div>

          {isSpinnerDone && (
            <div className="spinner-done-animation">
              <SpinnerPrizeAnimation />
              {(winningAmount || winningAmount === 0) && (
                <p className="spinner-winning-amount">+{winningAmount}</p>
              )}
            </div>
          )}
        </div>

        {!isSpinnerDone && (
          <div
            className={`spinner__button ${
              isFinalAnimationStarted && "spinner__button--pressed"
            }`}
          >
            <SpinnerStopImage onClick={beginToStopAnimation} />
          </div>
        )}
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
};

export default Spinner;
