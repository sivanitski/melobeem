import "swiper/swiper.less";

import propTypes from "prop-types";
import React, { useState } from "react";

import { LEVEL_INTERVALS } from "../../helpers/level";
import { CompetitorsSwiper } from "../competitors-swiper";

const CompetitorsSwiperMenu = ({ onSliderClick, maxLevel, minLevel }) => {
  const [activeLevel, setActiveLevel] = useState(minLevel);

  const handleSlideCLick = (index) => () => {
    setActiveLevel(index);
    onSliderClick(index);
  };

  return (
    <>
      <CompetitorsSwiper
        maxLevel={maxLevel}
        activeLevel={activeLevel}
        handleSlideCLick={handleSlideCLick}
      />
      <div className="competitors-level">
        <div className="competitors-level__amount">Level {activeLevel}</div>
        <div className="competitors-level__comment text-grey">
          (From {LEVEL_INTERVALS[activeLevel]} to{" "}
          {LEVEL_INTERVALS[activeLevel + 1]} Votes){" "}
        </div>
      </div>
    </>
  );
};

CompetitorsSwiperMenu.propTypes = {
  onSliderClick: propTypes.func.isRequired,
  maxLevel: propTypes.number.isRequired,
  minLevel: propTypes.number.isRequired,
};

export default CompetitorsSwiperMenu;
