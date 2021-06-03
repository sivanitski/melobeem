import React from "react";
import Lottie from "react-lottie-player";

import locker from "../../images/locker.json";

export default function Locker() {
  return (
    <div className="animation animation--locker">
      <Lottie loop={false} animationData={locker} play />
    </div>
  );
}
