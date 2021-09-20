import React from "react";
import Lottie from "react-lottie-player";

import lottieVoteSalut from "../../images/vote-salut.json";

export default function VoteSalut() {
  return (
    <div className="vote-salut-animation">
      <Lottie
        animationData={lottieVoteSalut}
        play
        speed={1}
        style={{
          display: "flex",
          placeContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100px",
          height: "100px",
        }}
      />
    </div>
  );
}
