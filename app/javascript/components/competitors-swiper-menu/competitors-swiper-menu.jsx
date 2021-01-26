import "swiper/swiper.less";

import classNames from "classnames";
import propTypes from "prop-types";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { LEVEL_INTERVALS, MAX_LEVEL } from "../../helpers/level";

const CompetitorsSwiperMenu = ({ onSliderClick }) => {
  const [activeLevel, setActiveLevel] = useState(1);

  const handleSlideCLick = (index) => () => {
    setActiveLevel(index);
    onSliderClick(index);
  };
  const renderSlides = () => {
    let slides = [];
    for (let i = 1; i < MAX_LEVEL + 1; i++) {
      const sliderClass = classNames("competitors__swiper__item headline", {
        active: activeLevel === i,
        "text-pink": !(activeLevel === i),
      });
      slides.push(
        <SwiperSlide
          className={sliderClass}
          key={i}
          onClick={handleSlideCLick(i)}
        >
          {i}
        </SwiperSlide>
      );
    }
    return <>{slides}</>;
  };

  return (
    <>
      <Swiper
        className="competitors__swiper swiper"
        spaceBetween={1}
        slidesPerView="auto"
      >
        {renderSlides()}
      </Swiper>
      <div className="competitors__level">
        <div className="competitors__level__amount">Level {activeLevel}</div>
        <div className="competitors__level__comment text-grey">
          (From {LEVEL_INTERVALS[activeLevel]} to{" "}
          {LEVEL_INTERVALS[activeLevel + 1]} Votes){" "}
        </div>
      </div>
    </>
  );
};

CompetitorsSwiperMenu.propTypes = {
  onSliderClick: propTypes.func.isRequired,
};

export default CompetitorsSwiperMenu;
