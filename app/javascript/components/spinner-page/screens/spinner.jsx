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
import CoderiverSpinner from "./CoderiverSpinner";

const Spinner = ({
  spinnerData,
  updateCurrentChild,
  getUserParams,
  handleAnimationEnd,
}) => {
  const spinnerElement = useRef(null);
  const spinnerPointer = useRef(null);
  const btn = useRef(null);
  const lottieAnim = useRef(null);
  const winningAmountRef = useRef(null);

  const [amount, setAmount] = useState(spinnerData?.count);
  const [isSpinnerDone, setIsSpinnerDone] = useState(false);
  const [isFinalAnimStarted, setIsFinalAnimStarted] = useState(false);
  const [winningAmount, setWinningAmount] = useState(false);
  const [zoomOutSpinner, setZoomOutSpinner] = useState(false);
  const [coderiverSpinner, setCoderiverSpinner] = useState(null);
  const [blinkingInterval, setBlinkingInterval] = useState(null);
  const [scenario, setScenario] = useState(null);

  const [timerId1, setTimerId1] = useState(null);
  const [timerId2, setTimerId2] = useState(null);
  const [timerId3, setTimerId3] = useState(null);

  useEffect(() => {
    setCoderiverSpinner(
      new CoderiverSpinner(spinnerElement.current, spinnerPointer.current)
    );
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timerId1);
    };
  }, [timerId1]);

  useEffect(() => {
    return () => {
      clearTimeout(timerId2);
    };
  }, [timerId2]);

  useEffect(() => {
    return () => {
      clearTimeout(timerId3);
    };
  }, [timerId3]);

  useEffect(() => {
    playAnimation();
  }, [coderiverSpinner]);

  useEffect(() => {
    return () => {
      stopBlinking();
    };
  }, [blinkingInterval]);

  const startBlinking = () => {
    setBlinkingInterval(
      setInterval(() => {
        btn.current.classList.toggle("blinking");
      }, 1500)
    );
  };

  const stopBlinking = () => {
    if (blinkingInterval) clearInterval(blinkingInterval);
  };

  const playAnimation = () => {
    if (!coderiverSpinner) return;

    coderiverSpinner.play();
    setIsSpinnerDone(false);
    startBlinking();
  };

  const restartAnimation = (spinsAmount, entry) => {
    if (amount - 1 === 0 || !amount) {
      setZoomOutSpinner(true);
      setTimeout(() => {
        handleAnimationEnd(spinsAmount, entry);
      }, 500);
      return;
    }

    setZoomOutSpinner(false);
    gsap
      .timeline({
        onComplete: () => {
          setIsSpinnerDone(false);
          setIsFinalAnimStarted(false);
          setWinningAmount(false);
          coderiverSpinner.play();

          startBlinking();
        },
      })
      .to(lottieAnim.current, {
        scale: 0,
        duration: 0.5,
        transformOrigin: "center 51.5%",
      })
      .to(btn.current, { scale: 1, duration: 0.3, ease: "easeOut" });
  };

  const stopAnimation = () => {
    if (isFinalAnimStarted) return;

    setIsFinalAnimStarted(true);
    stopBlinking();

    gsap
      .timeline()
      .to(btn.current, { scale: 0.8, duration: 0.15, ease: "easeOut" })
      .to(btn.current, { scale: 1, duration: 0.15, ease: "easeOut" });

    beginToStopAnimation();
  };

  const beginToStopAnimation = async () => {
    const res = await api.post("/spins");
    const endAngle = calculateAnimationAngle(res.data.value);
    const stopAngle = 2 * FULL_ROUND + endAngle;

    const stopAnimationDuration = coderiverSpinner.stop(stopAngle);

    const userParams = await getUserParams();

    const isLvlUp = userParams.levelStart !== userParams.levelEnd;
    const isRankUp = userParams.rankStart !== userParams.rankEnd;

    let lottieDuration = 9350;
    let scnr = 1;

    if (isLvlUp && isRankUp) {
      scnr = 1;
      lottieDuration = 9450;
    } else if (isLvlUp && !isRankUp) {
      scnr = 2;
      lottieDuration = 8550;
    } else if (!isLvlUp && isRankUp) {
      scnr = 3;
      lottieDuration = 5650;
    } else if (!isLvlUp && !isRankUp) {
      scnr = 4;
      lottieDuration = 5250;
    }

    setScenario(scnr);

    if (amount) setAmount(amount - 1);

    setTimerId1(
      setTimeout(() => {
        setWinningAmount(res.data.value);

        gsap.to(btn.current, { scale: 0.8, duration: 0.5, ease: "easeOut" });

        setIsSpinnerDone(true);

        gsap.fromTo(
          winningAmountRef.current,
          { scale: 0.3, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.45 }
        );

        setTimerId2(
          setTimeout(() => {
            updateCurrentChild(amount - 1, userParams.entry);
          }, 1450)
        );

        setTimerId3(
          setTimeout(() => {
            restartAnimation(amount - 1, userParams.entry);
          }, lottieDuration)
        );
      }, stopAnimationDuration)
    );
  };

  return (
    <div className={`spinner ${zoomOutSpinner && "spinner-zoom-out"}`}>
      <SpinnerTitle spinnerType={spinnerData.type} spinnerAmount={amount} />

      <div className="spinner__image">
        <div ref={spinnerPointer} className={`spinner__pointer`}>
          <SpinnerPointer />
        </div>

        <div className="parent_spinner-container">
          <div ref={spinnerElement} className="spinner__svg">
            <SpinnerImageColor
              spinnerType={spinnerData.type}
              spinnerAmount={spinnerData.count}
            />
          </div>

          {isSpinnerDone ? (
            <div className="spinner-done-animation" ref={lottieAnim}>
              <SpinnerPrizeAnimation scenario={scenario} />
              {winningAmount || winningAmount === 0 ? (
                <p ref={winningAmountRef} className="spinner-winning-amount">
                  <span className="spinner-winning-amount__prefix">+</span>
                  {winningAmount}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <div ref={btn} className={`spinner__button`}>
          <SpinnerStopImage onClick={stopAnimation} />
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
  handleAnimationEnd: propTypes.func,
  getUserParams: propTypes.func,
};

export default Spinner;
