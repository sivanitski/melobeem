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
        height={190}
        width={400}
      />
    </div>
  );
}
