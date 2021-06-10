import propTypes from "prop-types";
import React from "react";

import PaymentAnimation from "../../animation/payment-success";
import { Count } from "../../count";

const AnimationAfterPurchase = ({ value }) => {
  return (
    <>
      <PaymentAnimation />
      <div className="vote-animation__text headline--medium">
        <div className="vote-animation__title text-pink">
          <Count numberStart={value} numberEnd={0} isDecrease duration={2} />
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
