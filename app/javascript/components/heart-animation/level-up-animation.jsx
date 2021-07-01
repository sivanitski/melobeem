import React from "react";
import Lottie from "react-lottie-player";

import levelUpAnimationJson from "../../images/level-up-animation.json";

export default function LevelUpAnimation() {
  return (
    <div className="animation animation--level-up">
      <Lottie
        loop={false}
        animationData={levelUpAnimationJson}
        play
        style={{
          height: 95,
          width: 200,
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </div>
  );
}
