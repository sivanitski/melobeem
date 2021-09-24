import propTypes from "prop-types";
import React from "react";

import PaymentAnimation from "../../animation/payment-success";
import { CountAnimation } from "../../count-animation";

const AnimationAfterPurchase = ({ value, animationParams }) => {
  return (
    <>
      <PaymentAnimation />
      <div className="vote-animation__text headline--medium">
        <div className="vote-animation__title text-pink">
          <CountAnimation
            numberStart={value}
            numberEnd={0}
            animationParams={animationParams}
            typeOfPage={"level"}
            title={"vote"}
          />
        </div>
        <div className="vote-animation__subtitle text-grey">votes</div>
      </div>
    </>
  );
};

AnimationAfterPurchase.propTypes = {
  value: propTypes.number,
  animationParams: propTypes.object,
};

export default AnimationAfterPurchase;
