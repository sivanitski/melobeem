import "./style.less";

import gsap from "gsap";
import propTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

import VoteSalut from "../animation/vote-salut";

const CountAnimation = ({
  numberStart,
  numberEnd,
  isDecrease,
  value,
  title,
  animationParams,
  typeOfPage,
  afterEndHandler,
  isGrey,
}) => {
  const listElement = useRef(null);

  const [number, setNumber] = useState(numberStart);
  const [grey, setGrey] = useState(false);
  const [isVoteSulutVisible, setIsVoteSulutVisible] = useState(false);
  const [timerId1, setTimerId1] = useState(null);
  const [timerId2, setTimerId2] = useState(null);

  let delay = 6000;
  let duration = title === "vote" ? 1000 : 200;

  const delaysData = {
    spinner: {
      vote: [1450, 1450],
      rank: [4150, 7450],
    },
    level: {
      vote: [2000, 2000],
      rank: [7000, 10300],
    },
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerId1);
    };
  }, [timerId1]);

  useEffect(() => {
    return () => {
      clearTimeout(timerId2);
    };
  }, [timerId2]);

  useEffect(() => {
    const isLvlUp = animationParams?.levelStart !== animationParams?.levelEnd;
    delay = delaysData?.[typeOfPage]?.[title]?.[Number(isLvlUp)] || 0;
  }, [animationParams]);

  useEffect(() => {
    if (title === "vote" && typeOfPage === "level") {
      duration = 2300;
    }
  }, [value]);

  useEffect(() => {
    if (animationParams?.isAnimationPlay) {
      setTimerId1(
        setTimeout(() => {
          playAnimation();
        }, delay)
      );
    }
  }, [animationParams?.isAnimationPlay, animationParams?.votesEnd]);

  const playAnimation = () => {
    const cont = { val: numberStart };
    gsap.to(cont, {
      val: numberEnd,
      duration: duration / 1000,
      roundProps: "val",
      onUpdate: function () {
        setNumber(cont.val);
      },
      onComplete: () => {
        setIsVoteSulutVisible(true);
        if (afterEndHandler) afterEndHandler();

        if (isGrey) setGrey(true);

        setTimerId2(
          setTimeout(() => {
            setIsVoteSulutVisible(false);
          }, 750)
        );
      },
    });
  };

  return (
    <div className="count__wrapper">
      <div
        ref={listElement}
        className={`header-user__item__number headline--medium text-pink count__list ${
          isDecrease && "count__list--decrease"
        }
        ${grey && "text-grey background-light"}
        `}
      >
        {grey ? numberStart : number}
      </div>
      {/* {title === "vote" ? <VoteSalut isPlay={isVoteSulutVisible} /> : null} */}
      {/* <VoteSalut isPlay={isVoteSulutVisible} />  */}
      {title === "vote" && !grey && isVoteSulutVisible ? <VoteSalut /> : null}
      {/* <VoteSalut /> */}
    </div>
  );
};

CountAnimation.propTypes = {
  numberEnd: propTypes.number,
  numberStart: propTypes.number,
  delay: propTypes.number,
  duration: propTypes.number,
  value: propTypes.number,
  title: propTypes.string,
  typeOfPage: propTypes.string,
  animationParams: propTypes.object,
  isDecrease: propTypes.bool,
  isGrey: propTypes.bool,
  animationStep: propTypes.number,
  setAnimationStep: propTypes.func,
  handleAnimationEnd: propTypes.func,
  afterEndHandler: propTypes.func,
};

CountAnimation.defaultProps = {
  delay: 0,
  duration: 1000,
};

export default CountAnimation;
