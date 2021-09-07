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

const Spinner = ({ spinnerData, updateCurrentChild }) => {
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

  useEffect(() => {
    setCoderiverSpinner(
      new CoderiverSpinner(spinnerElement.current, spinnerPointer.current)
    );
  }, []);

  useEffect(() => {
    playAnimation();
  }, [coderiverSpinner]);

  const playAnimation = () => {
    if (!coderiverSpinner) return;

    coderiverSpinner.play();
    setIsSpinnerDone(false);
  };

  const restartAnimation = () => {
    if (amount === 0 || !amount) {
      setZoomOutSpinner(true);
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
        },
      })
      .to(lottieAnim.current, { scale: 0, duration: 0.5 }) // zoom out lottie animation
      .to(btn.current, { scale: 1, duration: 0.3, ease: "easeOut" });
  };

  const stopAnimation = () => {
    if (isFinalAnimStarted) return;

    setIsFinalAnimStarted(true);
    gsap
      .timeline()
      .to(btn.current, { scale: 0.8, duration: 0.15, ease: "easeOut" })
      .to(btn.current, { scale: 1, duration: 0.15, ease: "easeOut" });
    // .to(btn.current, {scale: 0.6, duration: 0.5, ease: 'easeOut'});

    beginToStopAnimation();
  };

  const beginToStopAnimation = async () => {
    const res = await api.post("/spins");
    const endAngle = calculateAnimationAngle(res.data.value);
    const stopAngle = 2 * FULL_ROUND + endAngle;

    const stopAnimationDuration = coderiverSpinner.stop(stopAngle);

    if (amount) setAmount(amount - 1);

    setTimeout(() => {
      setWinningAmount(res.data.value);

      gsap.to(btn.current, { scale: 0.8, duration: 0.5, ease: "easeOut" });

      setIsSpinnerDone(true); // start lottie animation

      gsap.fromTo(
        winningAmountRef.current,
        { scale: 0.3 },
        { scale: 1, duration: 1.5, delay: 0.5 }
      );

      setTimeout(() => {
        if (amount) updateCurrentChild(amount - 1); // start header animation
      }, 1450); // we are waiting this time when lottie animation starting

      setTimeout(restartAnimation, 7450); // this time should depend on the script
    }, stopAnimationDuration);
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
              <SpinnerPrizeAnimation />
              {/* {(winningAmount || winningAmount === 0) ?  ( */}
              <p ref={winningAmountRef} className="spinner-winning-amount">
                +{winningAmount}
              </p>
              {/* ) : null} */}
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
};

export default Spinner;
