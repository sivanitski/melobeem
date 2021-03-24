import "swiper/swiper.less";

import classNames from "classnames";
import propTypes from "prop-types";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import defaultProptypes from "../../default-proptypes";

const CompetitorsSwiper = ({ activeLevel, handleSlideCLick, levels }) => {
  const renderSlides = () => {
    let slides = [];

    levels.forEach((level) => {
      const sliderClass = classNames("competitors-swiper__item headline", {
        active: activeLevel === level,
        "text-pink": !(activeLevel === level),
      });
      slides.push(
        <SwiperSlide
          className={sliderClass}
          key={level}
          onClick={handleSlideCLick(level)}
        >
          {level}
        </SwiperSlide>
      );
    });

    return <>{slides}</>;
  };

  return (
    <Swiper
      className="competitors-swiper swiper"
      spaceBetween={1}
      slidesPerView="auto"
    >
      {renderSlides()}
    </Swiper>
  );
};

CompetitorsSwiper.propTypes = {
  handleSlideCLick: propTypes.func.isRequired,
  activeLevel: propTypes.number.isRequired,
  maxLevel: propTypes.number.isRequired,
  competitors: propTypes.arrayOf(defaultProptypes.CHILD).isRequired,
  levels: propTypes.arrayOf(propTypes.number.isRequired).isRequired,
};

export default CompetitorsSwiper;
