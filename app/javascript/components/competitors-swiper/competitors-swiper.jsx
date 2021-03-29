import "swiper/swiper.less";

import classNames from "classnames";
import propTypes from "prop-types";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import LockerImage from "../../images/locker.svg";

const CompetitorsSwiper = ({ activeLevel, handleSlideCLick, maxLevel }) => {
  const renderSlides = () => {
    let slides = [];

    for (let level = 1; level < maxLevel + 1; level++) {
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
    }

    slides.push(
      <SwiperSlide className="competitors-swiper__item headline" key="locker">
        <LockerImage />
      </SwiperSlide>
    );

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
};

export default CompetitorsSwiper;
