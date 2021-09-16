import React from "react";
import Lottie from "react-lottie-player";

// import spinnerPrizeAnimationJson from "../../images/spinner_prize_animation.json";
import spinnerPrizeAnimationJson1 from "../../images/spinner_prize_animation-1.json";
// import spinnerPrizeAnimationJson2 from "../../images/spinner_prize_animation-2-7s.json";
// import spinnerPrizeAnimationJson3 from "../../images/spinner_prize_animation-3.json";
// import spinnerPrizeAnimationJson4 from "../../images/spinner_prize_animation-4.json";

export default function SpinnerPrizeAnimation() {
  return (
    <div className="animation animation--spinner prize-animation">
      <Lottie
        animationData={spinnerPrizeAnimationJson1}
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
