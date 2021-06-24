import propTypes from "prop-types";
import React from "react";

import PaymentAnimation from "../../animation/payment-success";
import { CountAnimation } from "../../count-animation";

const AnimationAfterPurchase = ({ value }) => {
  return (
    <>
      <PaymentAnimation />
      <div className="vote-animation__text headline--medium">
        <div className="vote-animation__title text-pink">
          <CountAnimation numberStart={value} numberEnd={0} isDecrease />
        </div>
        <div className="vote-animation__subtitle text-grey">votes</div>
      </div>
    </>
  );
};

AnimationAfterPurchase.propTypes = {
  value: propTypes.number,
};

export default AnimationAfterPurchase;
