import React from "react";
import Lottie from "react-lottie-player";

// import spinnerPrizeAnimationJson from "../../images/spinner_prize_animation.json";
import spinnerPrizeAnimationJson1 from "../../images/spinner_prize_animation-1.json";
// import spinnerPrizeAnimationJson2 from "../../images/spinner_prize_animation-2-7s.json";
// import spinnerPrizeAnimationJson3 from "../../images/spinner_prize_animation-3.json";
// import spinnerPrizeAnimationJson4 from "../../images/spinner_prize_animation-4.json";

export default function SpinnerPrizeAnimation() {
  // let animation = spinnerPrizeAnimationJson1;

  // switch (scenario) {
  //   case 1:
  //     animation = spinnerPrizeAnimationJson1;
  //     break;
  //   case 2:
  //     animation = spinnerPrizeAnimationJson2;
  //     break;
  //   case 3:
  //     animation = spinnerPrizeAnimationJson3;
  //     break;
  //   case 4:
  //     animation = spinnerPrizeAnimationJson4;
  //     break;
  //   default:
  //     animation = spinnerPrizeAnimationJson1;
  // }
  // console.log('isLvlUp', isLvlUp);
  // React.useEffect(() => {
  //   console.log('isLvlUp', isLvlUp);
  // }, [isLvlUp])
  // React.useEffect(() => {
  //   console.log('animationParams2', animationParams);
  // if (animationParams) {

  //   if (animationParams.levelStart !== animationParams.levelEnd && !isLvlUp) {
  //     setIsLvlUp(true)
  //   }
  //   else setIsLvlUp(false)
  // }

  // }, [animationParams])

  return (
    <div className="animation animation--spinner prize-animation">
      <Lottie
        animationData={spinnerPrizeAnimationJson1}
        play
        speed={0.8}
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
