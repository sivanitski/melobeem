import propTypes from "prop-types";
import React from "react";

const HeartAnimationBig = ({ animationLevel }) => {
  return (
    <svg
      width="260"
      height="210"
      viewBox="0 0 260 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bottom-to-top" x2="0%" y2="100%">
          <stop offset="0" stopColor="#fff">
            <animate
              dur="2s"
              attributeName="offset"
              fill="freeze"
              from="1"
              to={`${animationLevel}`}
            />
          </stop>
          <stop offset="0" stopColor="#FF7098">
            <animate
              dur="2s"
              attributeName="offset"
              fill="freeze"
              from="0"
              to={`${animationLevel}`}
            />
          </stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#bottom-to-top)"
        d="M5.59628 98.6881L5.59623 98.6879C-3.46756 71.4568 5.32911 42.0424 23.8842 22.8707C42.3816 3.75852 70.4447 -5.05386 100.038 8.65936C101.415 9.29912 102.787 9.97905 104.152 10.7045L104.153 10.705L124.374 21.4374C127.892 23.3046 132.108 23.3046 135.626 21.4374L155.847 10.705L155.848 10.7045C157.213 9.97931 158.583 9.29962 159.96 8.66008C189.556 -5.05418 217.619 3.75822 236.117 22.8706C254.671 42.0424 263.467 71.4568 254.404 98.6879L254.404 98.6881C250.005 111.907 241.288 123.217 230.358 131.69C230.358 131.69 230.358 131.69 230.358 131.69L134.901 205.671C132.016 207.907 127.984 207.907 125.099 205.671L29.6422 131.69C29.6422 131.69 29.6421 131.69 29.6421 131.69C18.712 123.217 9.99504 111.907 5.59628 98.6881Z"
        stroke="#FF7098"
        strokeWidth="4"
      />
    </svg>
  );
};

HeartAnimationBig.propTypes = {
  animationLevel: propTypes.number.isRequired,
};

export default HeartAnimationBig;
