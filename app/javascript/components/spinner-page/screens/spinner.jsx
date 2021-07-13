import "./style.less";

import { useRequest } from "ahooks";
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
        duration: 3,
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
  }, [needToShowShop]);

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

    let stopAngle = endAngle + FULL_ROUND;

    if (stopAngle < storedAngle + FULL_ROUND) {
      stopAngle = stopAngle + FULL_ROUND;
    }

    let spinnerSpeed = (3 / 360) * stopAngle + 1;

    gsap.to(spinnerElement.current, {
      rotate: stopAngle,
      duration: spinnerSpeed,
      repeat: 0,
      ease: "linear",
      onComplete: () => {
        finalAnimation(res.data.value);
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
    }, 500);

    updateCurrentChild();

    updateUser();
  };

  const getSpinnersInfo = () => {
    return api.get(`/spins/check_presence`);
  };

  const { data, run: requestSpinnerInfo } = useRequest(getSpinnersInfo, {
    formatResult: (res) => res.data,
  });

  useEffect(() => {
    if (data && data.count > 0) {
      setZoomOutSpinner(false);
      setCurrentSpinner(data);
      setAmount(data.count);
      setIsSpinnerDone(false);
      setWinningAmount(false);
      setAnimationCompleted(false);
      setIsFinalAnimationStarted(false);
      setNeedToShowShop(false);
    }
  }, [data]);

  useEffect(() => {
    if (isSpinnerDone && !animationCompleted) {
      setTimeout(() => {
        setAnimationCompleted(true);
      }, 6500);
    }

    if (animationCompleted) {
      if (amount === 0 || !amount) {
        setZoomOutSpinner(true);
        setTimeout(() => {
          setNeedToShowShop(true);
        }, 200);
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

  return needToShowShop ? (
    <NoSpinner
      requestSpinnerInfo={requestSpinnerInfo}
      updateUser={updateUser}
      withAnimation={true}
    />
  ) : (
    <div className={`spinner ${zoomOutSpinner ? "spinner-zoom-out" : " "}`}>
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
