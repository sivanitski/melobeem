import React from "react";
import Lottie from "react-lottie-player";

import spinnerPrizeAnimationJson from "../../images/spinner_prize_animation.json";

export default function SpinnerPrizeAnimation() {
  return (
    <div className="animation animation--spinner">
      <Lottie
        animationData={spinnerPrizeAnimationJson}
        play
        speed={0.7}
        style={{
          height: 262,
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </div>
  );
}
