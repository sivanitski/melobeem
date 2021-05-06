import "swiper/swiper.less";

import classNames from "classnames";
import propTypes from "prop-types";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import LockerImage from "../../images/locker.svg";

const LevelSwiperMenu = ({
  activeLevel,
  handleSlideCLick,
  maxLevel,
  lockerAmount,
  initialSlide,
}) => {
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

    for (let i = 0; i < lockerAmount; i++) {
      slides.push(
        <SwiperSlide
          className="competitors-swiper__item headline"
          key={`locker-${i}`}
        >
          <LockerImage />
        </SwiperSlide>
      );
    }

    return <>{slides}</>;
  };

  return (
    <Swiper
      className="competitors-swiper swiper"
      spaceBetween={1}
      slidesPerView="auto"
      initialSlide={initialSlide}
    >
      {renderSlides()}
    </Swiper>
  );
};

LevelSwiperMenu.propTypes = {
  handleSlideCLick: propTypes.func.isRequired,
  activeLevel: propTypes.number.isRequired,
  maxLevel: propTypes.number.isRequired,
  lockerAmount: propTypes.number.isRequired,
  initialSlide: propTypes.number.isRequired,
};

export default LevelSwiperMenu;
