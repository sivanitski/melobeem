import gsap from "gsap";
import propTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

const HeartLevel = ({ animationLevel }) => {
  const levelRef = useRef(null);
  const levelRefPink = useRef(null);

  const [currentLvl, setCurrentLvl] = useState(animationLevel);
  const [timelineAnim, setTimelineAnim] = useState(null);

  const playAnim = (lvl, quick) => {
    const px = lerp(-56, 0, lvl);

    const timeline = gsap
      .timeline({ paused: true })
      .to(levelRef.current, { y: px, duration: 0.3 }, 0)
      .fromTo(levelRef.current, { x: 0 }, { x: 158, duration: 2 }, 0)
      .to(levelRefPink.current, { y: px + 1, duration: 0.3 }, 0)
      .fromTo(levelRefPink.current, { x: 0 }, { x: 158, duration: 3 }, 0);

    if (quick) {
      timeline.progress(1);
    } else {
      timeline.play();
    }

    setTimelineAnim(timeline);
  };

  useEffect(() => {
    return () => {
      if (timelineAnim) {
        timelineAnim.pause();
        timelineAnim.kill();
      }
    };
  }, [timelineAnim]);

  useEffect(() => {
    if (currentLvl !== animationLevel) {
      setCurrentLvl(animationLevel);
      playAnim(animationLevel, currentLvl === -1);
    }
  }, [animationLevel]);

  // useEffect(() => {
  //   console.log("currentLvl", currentLvl);

  // }, [currentLvl]);

  return (
    <svg
      width="68"
      height="57"
      viewBox="0 0 68 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="68"
        height="57"
      >
        <path
          d="M1.92027 26.8692L1.92025 26.8691C-0.399664 19.5782 1.85351 11.691 6.6048 6.55566C11.3251 1.45384 18.4355 -0.868679 25.9471 2.77228C26.2997 2.94354 26.6503 3.12545 26.9993 3.31944L26.9998 3.31972L33.5146 6.93664L34 7.20613L34.4854 6.93664L41.0002 3.31972L41.0007 3.31944C41.3496 3.12545 41.7003 2.94354 42.0528 2.77228C49.5649 -0.868703 56.6752 1.45385 61.3954 6.55565C66.1466 11.6909 68.3996 19.5782 66.0797 26.8691V26.8692C64.958 30.3955 62.7333 33.4174 59.938 35.684L36.519 54.6704C35.0506 55.8609 32.9493 55.8609 31.4809 54.6704L8.06196 35.684C5.26671 33.4174 3.042 30.3955 1.92027 26.8692Z"
          fill="#C4C4C4"
          stroke="#FF7098"
        />
      </mask>
      <g mask="url(#mask0)">
        <path
          ref={levelRefPink}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M35.5381 56.2785C26.0803 55.7819 16.3482 55.2709 7.37848 56.9247C-5.8143 59.3573 -14.6095 58.3771 -17.358 56.9247C-18.9934 56.0605 -22.293 54.9906 -26 55.0001V55.0001C-29.707 54.9907 -33.0066 56.0606 -34.642 56.9248C-37.3905 58.3772 -46.1857 59.3573 -59.3785 56.9248C-68.3482 55.2709 -78.0803 55.782 -87.5381 56.2786C-91.9909 56.5124 -96.3829 56.743 -100.606 56.743H-139H-158V164.397H-139L-26 164.305L68 164.382V56.7429H48.6059C44.3829 56.7429 39.9909 56.5123 35.5381 56.2785Z"
          fill="#FF9CB8"
        />
        <path
          ref={levelRef}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.5381 57.2785C7.08029 56.7819 -2.65178 56.2708 -11.6215 57.9247C-24.8143 60.3572 -33.6095 59.3771 -36.358 57.9247C-37.9934 57.0605 -41.293 55.9906 -45 56V56.0001C-48.707 55.9906 -52.0066 57.0606 -53.642 57.9248C-56.3905 59.3772 -65.1857 60.3573 -78.3785 57.9248C-87.3482 56.2709 -97.0803 56.7819 -106.538 57.2786C-110.991 57.5124 -115.383 57.743 -119.606 57.743H-158V165.397L-45 165.305L68 165.397V57.7429H29.6059C25.3829 57.7429 20.9909 57.5123 16.5381 57.2785Z"
          fill="#FF7098"
        />
      </g>
      <path
        d="M1.92027 26.8692L1.92025 26.8691C-0.399664 19.5782 1.85351 11.691 6.6048 6.55566C11.3251 1.45384 18.4355 -0.868679 25.9471 2.77228C26.2997 2.94354 26.6503 3.12545 26.9993 3.31944L26.9998 3.31972L33.5146 6.93664L34 7.20613L34.4854 6.93664L41.0002 3.31972L41.0007 3.31944C41.3496 3.12545 41.7003 2.94354 42.0528 2.77228C49.5649 -0.868703 56.6752 1.45385 61.3954 6.55565C66.1466 11.6909 68.3996 19.5782 66.0797 26.8691V26.8692C64.958 30.3955 62.7333 33.4174 59.938 35.684L36.519 54.6704C35.0506 55.8609 32.9493 55.8609 31.4809 54.6704L8.06196 35.684C5.26671 33.4174 3.042 30.3955 1.92027 26.8692Z"
        stroke="#FF7098"
        strokeWidth="2"
      />
    </svg>
  );
};

HeartLevel.propTypes = {
  animationLevel: propTypes.number.isRequired,
};

export default HeartLevel;
