import "swiper/swiper.less";

import propTypes from "prop-types";
import React, { useState } from "react";

import { getVoteIntervalFromLevel } from "../../helpers/level";
import { LevelSwiperMenu } from "../level-swiper-menu";

const CompetitorsSwiperMenu = ({ onSliderClick, maxLevel, minLevel }) => {
  const [activeLevel, setActiveLevel] = useState(minLevel);

  const handleSlideCLick = (index) => () => {
    setActiveLevel(index);
    onSliderClick(index);
  };

  return (
    <>
      <LevelSwiperMenu
        maxLevel={maxLevel}
        activeLevel={activeLevel}
        handleSlideCLick={handleSlideCLick}
      />
      <div className="competitors-level">
        <div className="competitors-level__amount">Level {activeLevel}</div>
        <div className="competitors-level__comment text-grey">
          {getVoteIntervalFromLevel(activeLevel)}
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
