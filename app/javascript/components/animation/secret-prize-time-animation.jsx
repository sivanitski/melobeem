import React from "react";
import Lottie from "react-lottie-player";

import secretPrizeTimeAnim from "../../images/secret-prize-time-anim.json";

export default function SecretPrizeTimeAnimation() {
  return (
    <div className="animation animation--loader">
      <Lottie loop={false} animationData={secretPrizeTimeAnim} play />
    </div>
  );
}
