import propTypes from "prop-types";
import React from "react";

const HeartAnimationLevelUpdated1 = ({ duration, levelEnd }) => {
  return (
    <svg
      width="68"
      height="57"
      viewBox="0 0 68 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bottom-to-top" x2="0%" y2="100%">
          <stop offset="0" stopColor="#fff">
            <animate
              dur={`${duration}s`}
              attributeName="offset"
              from={`${levelEnd}`}
              to="0"
              calcMode="linear"
              keySplines="0,0,1,1"
            />
          </stop>
          <stop offset="0" stopColor="#FF7098">
            <animate
              dur={`${duration}s`}
              attributeName="offset"
              from={`${levelEnd}`}
              to="0"
              calcMode="linear"
              keySplines="0,0,1,1"
            />
          </stop>
        </linearGradient>
      </defs>

      <path
        fill="url(#bottom-to-top)"
        d="M1.92027 26.8692L1.92025 26.8691C-0.399665 19.5782 1.85351 11.691 6.6048 6.55566C11.3251 1.45384 18.4355 -0.86868 25.9471 2.77228C26.2997 2.94354 26.6503 3.12545 26.9993 3.31944L26.9998 3.31972L33.5146 6.93664L34 7.20613L34.4854 6.93664L41.0002 3.31972L41.0007 3.31944C41.3496 3.12545 41.7003 2.94354 42.0528 2.77228C49.5649 -0.868704 56.6752 1.45385 61.3954 6.55565C66.1466 11.6909 68.3996 19.5782 66.0797 26.8691L66.0797 26.8692C64.958 30.3955 62.7333 33.4174 59.938 35.684L36.519 54.6704C35.0506 55.8609 32.9493 55.8609 31.4809 54.6704L8.06196 35.684C5.26671 33.4174 3.042 30.3955 1.92027 26.8692Z"
        stroke="#FF7098"
        strokeWidth="2"
      />
    </svg>
  );
};

HeartAnimationLevelUpdated1.propTypes = {
  duration: propTypes.number.isRequired,
  levelEnd: propTypes.number.isRequired,
};

export default HeartAnimationLevelUpdated1;
