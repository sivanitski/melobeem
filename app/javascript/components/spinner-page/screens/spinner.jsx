import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

import { api } from "../../../api";
import {
  calcSecondAnimationParameters,
  FIRST_ANIMATION_SPEED,
  FIRST_ANIMATION_TIME,
  FULL_ROUND,
} from "../../../helpers/spinner";
import SpinnerStopImage from "../../../images/spinner-stop.svg";
import SpinnerPointer from "../../../images/stopper.svg";
import SpinnerPrizeAnimation from "../../animation/spinner-prize-animation";
import SpinnerImageColor from "../blocks/spinner-image";
import SpinnerTitle from "../blocks/spinner-title";
import NoSpinner from "./no-spinner";

const Spinner = ({ spinnerData, updateCurrentChild, updateUser }) => {
  const spinnerElement = useRef(null);
  const [isAnimationPlay, setIsAnimationPlay] = useState(false);
  const [spinnerAnimation, setSpinnerAnimation] = useState(null);
  const [amount, setAmount] = useState(spinnerData?.count);
  const [isSpinnerDone, setIsSpinnerDone] = useState(false);
  const [winningAmount, setWinningAmount] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [needToShowShop, setNeedToShowShop] = useState(false);
  const [slowDownStopper, setSlowDownStopper] = useState(false);
  const [currentSpinner, setCurrentSpinner] = useState(spinnerData);
  const [storedAngle, setStoredAngle] = useState(0);

  const startAnimation = () => {
    const animation = spinnerElement.current.animate(
      [
        { transform: `rotate(${storedAngle}deg)` },
        { transform: `rotate(${storedAngle + FULL_ROUND}deg)` },
      ],
      {
        duration: FIRST_ANIMATION_TIME,
        iterations: Infinity,
        fill: "forwards",
        easing: "linear",
      }
    );
    setIsAnimationPlay(true);
    setSpinnerAnimation(animation);
    setIsSpinnerDone(false);
  };

  useEffect(() => {
    if (spinnerElement.current) {
      startAnimation();
    }
  }, [needToShowShop]);

  const getCorrectAngle = (angle) => {
    let countFullRounds = Math.floor(angle / FULL_ROUND);
    let fullAngle = FULL_ROUND * countFullRounds;
    return angle - fullAngle;
  };

  const getCorrectEndAngle = (endAngle, realAngle) => {
    let countFullRounds = Math.floor(storedAngle / FULL_ROUND) + 1;
    let fullAngle = FULL_ROUND * countFullRounds;
    let fullCountedAngle = endAngle + fullAngle;

    while (fullCountedAngle - realAngle > FULL_ROUND) {
      fullCountedAngle = fullCountedAngle - FULL_ROUND;
    }

    return fullCountedAngle;
  };

  const beginToStopAnimation = async () => {
    if (!spinnerAnimation) {
      return;
    }

    const res = await api.post("/spins");

    const animationParams = calcSecondAnimationParameters(
      spinnerAnimation.currentTime,
      res.data.value
    );

    spinnerAnimation.pause();

    setSlowDownStopper(true);

    if (animationParams.endAngle > FULL_ROUND) {
      animationParams.endAngle = animationParams.endAngle - FULL_ROUND;
    }

    let realAngleCount =
      animationParams.fullRoundsAfterFirstAnimation * FULL_ROUND +
      animationParams.endAngle;

    let toAngle = realAngleCount;

    let angleDiff =
      getCorrectEndAngle(toAngle, realAngleCount) -
      animationParams.currentAngle;

    let timeToEnd =
      FIRST_ANIMATION_SPEED *
      (angleDiff + getCorrectAngle(toAngle, realAngleCount)) *
      100;

    setStoredAngle(getCorrectAngle(toAngle, realAngleCount));

    spinnerElement.current.animate(
      [
        {
          transform: `rotate(${animationParams.currentAngle + storedAngle}deg)`,
        },
        {
          transform: `rotate(${getCorrectEndAngle(
            toAngle,
            realAngleCount
          )}deg)`,
        },
      ],
      {
        fill: "forwards",
        duration: timeToEnd,
        iterations: 1,
        easing: "linear",
      }
    );
    if (amount) {
      setTimeout(() => {
        setAmount(amount - 1);
      }, timeToEnd);
    }

    setSpinnerAnimation(null);
    setIsAnimationPlay(false);

    setTimeout(() => {
      setIsSpinnerDone(true);
      setSlowDownStopper(false);
    }, timeToEnd);

    setTimeout(() => {
      setWinningAmount(res.data.value);
    }, timeToEnd + 600);

    const timeToResetNumbers = timeToEnd + 2400;

    setTimeout(updateCurrentChild, timeToEnd + 600);

    setTimeout(updateUser, timeToResetNumbers);
  };

  const getSpinnersInfo = () => {
    return api.get(`/spins/check_presence`);
  };

  const { data, run: requestSpinnerInfo } = useRequest(getSpinnersInfo, {
    formatResult: (res) => res.data,
  });

  useEffect(() => {
    if (data && data.count > 0) {
      setCurrentSpinner(data);
      setAmount(data.count);
      setIsSpinnerDone(false);
      setWinningAmount(false);
      setAnimationCompleted(false);
      setNeedToShowShop(false);
    }
  }, [data]);

  useEffect(() => {
    if (isSpinnerDone && !animationCompleted) {
      setTimeout(() => {
        setAnimationCompleted(true);
      }, 2800);
    }

    if (animationCompleted) {
      if (amount === 0 || !amount) {
        setTimeout(() => {
          setNeedToShowShop(true);
        }, 200);
      } else {
        setAnimationCompleted(null);
        setWinningAmount(false);
        setIsSpinnerDone(false);
        startAnimation();
      }
    }
  }, [isSpinnerDone, animationCompleted]);

  return needToShowShop ? (
    <NoSpinner
      requestSpinnerInfo={requestSpinnerInfo}
      updateUser={updateUser}
      withAnimation={true}
    />
  ) : (
    <div className={`spinner ${animationCompleted ? "spinner-zoom-out" : " "}`}>
      <SpinnerTitle spinnerType={currentSpinner.type} spinnerAmount={amount} />

      <div className="spinner__image">
        <SpinnerPointer
          className={`spinner__pointer ${
            isAnimationPlay ? "spinner__pointer-animation" : ""
          } ${slowDownStopper ? "spinner__pointer-animation-slow" : ""}`}
        />
        <div className="parent_spinner-container">
          <div ref={spinnerElement} className="spinner__svg">
            <SpinnerImageColor
              spinnerType={currentSpinner.type}
              spinnerAmount={currentSpinner.count}
            />
          </div>

          {isSpinnerDone && (
            <div className="spinner-done-animation">
              <SpinnerPrizeAnimation />
              {winningAmount || winningAmount === 0 ? (
                <p className="spinner-winning-amount">+{winningAmount}</p>
              ) : (
                " "
              )}
            </div>
          )}
        </div>

        {isSpinnerDone ? (
          " "
        ) : (
          <div className="spinner__button">
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
  updateUser: propTypes.func,
};

export default Spinner;
