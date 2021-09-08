import React from "react";
import Lottie from "react-lottie-player";

import spinnerPrizeAnimationJson from "../../images/spinner_prize_animation.json";

export default function SpinnerPrizeAnimation() {
  return (
    <div className="animation animation--spinner">
      <Lottie
        animationData={spinnerPrizeAnimationJson}
        play
        speed={1}
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
