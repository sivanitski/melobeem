import React from "react";
import Lottie from "react-lottie-player";

import loader from "../../images/loader.json";

export default function Loader() {
  return (
    <div className="animation animation--loader">
      <Lottie
        loop
        animationData={loader}
        play
        style={{ width: 120, height: 120 }}
      />
    </div>
  );
}
