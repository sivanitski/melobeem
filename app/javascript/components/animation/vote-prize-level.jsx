import "./style.less";

import propTypes from "prop-types";
import React from "react";
import Lottie from "react-lottie-player";

import votePrize1 from "../../images/level-vote-prize-animation-1.json";
import votePrize2 from "../../images/level-vote-prize-animation-2.json";
import votePrize3 from "../../images/level-vote-prize-animation-3.json";
import votePrize4 from "../../images/level-vote-prize-animation-4.json";
import votePrize5 from "../../images/level-vote-prize-animation-5.json";
import votePrize6 from "../../images/level-vote-prize-animation-6.json";
import votePrize7 from "../../images/level-vote-prize-animation-7.json";
import votePrize8 from "../../images/level-vote-prize-animation-8.json";
import votePrize9 from "../../images/level-vote-prize-animation-9.json";
import votePrize10 from "../../images/level-vote-prize-animation-10.json";

export default function VotePrizeAnimation({ number }) {
  const votePrize = {
    1: votePrize1,
    2: votePrize2,
    3: votePrize3,
    4: votePrize4,
    5: votePrize5,
    6: votePrize6,
    7: votePrize7,
    8: votePrize8,
    9: votePrize9,
    10: votePrize10,
  };

  return (
    <div className="animation animation--payment">
      <Lottie loop={false} animationData={votePrize[number]} play />
    </div>
  );
}

VotePrizeAnimation.propTypes = {
  number: propTypes.number.isRequired,
};
