import React from "react";
import { useRef } from "react/cjs/react.development";
import Lottie from "react-lottie-player";

import lottieVoteSalut from "../../images/spark-for-vote.json";
// import lottieVoteSalut from "../../images/vote-salut.json";

export default function VoteSalut() {
  const voteSalutRef = useRef(null);

  // useEffect(() => {
  //   let counter = 0;
  //   [...voteSalutRef.current.querySelectorAll("svg path")].forEach((path) => {
  //     const gOriginal = path.parentElement;
  //     const gParent = gOriginal.parentElement;
  //     const gsInParent = [...gParent.childNodes];

  //     gsInParent.forEach((g) => {
  //       if (g !== gOriginal) g.remove();
  //     });

  //     counter += gsInParent.length - 1;
  //   });
  //   console.log("counter", counter);
  // }, []);

  return (
    <div className="vote-salut-animation" ref={voteSalutRef}>
      <Lottie
        animationData={lottieVoteSalut}
        speed={1}
        // play={isPlay}
        play
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
