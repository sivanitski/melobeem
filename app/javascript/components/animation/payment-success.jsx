import "./style.less";

import React from "react";
import Lottie from "react-lottie-player";

import paymentSuccess from "../../images/payment-success.json";

export default function PaymentAnimation() {
  return (
    <div className="animation animation--payment">
      <Lottie loop={false} animationData={paymentSuccess} play />
    </div>
  );
}
