import "swiper/swiper.less";

import classNames from "classnames";
import propTypes from "prop-types";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import PrizeImage from "../../images/gift-level.svg";
import LockerImage from "../../images/locker-small.svg";

const LevelSwiperMenu = ({
  notSpentPrizes,
  activeLevel,
  handleSlideCLick,
  maxLevel,
  lockerAmount,
  initialSlide,
}) => {
  const checkPrizeOnlevel = (level) => {
    if (!notSpentPrizes) return null;

    return notSpentPrizes.find((prize) => prize.level === level);
  };

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
          {checkPrizeOnlevel(level) ? <PrizeImage /> : level}
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
      resistanceRatio="0.85"
      freeMode={true}
    >
      {renderSlides()}
    </Swiper>
  );
};

LevelSwiperMenu.propTypes = {
  notSpentPrizes: propTypes.arrayOf(
    propTypes.shape({
      entryId: propTypes.number,
      id: propTypes.number,
      level: propTypes.number,
      sourceType: propTypes.string,
      spent: propTypes.bool,
      value: propTypes.number,
    })
  ),
  handleSlideCLick: propTypes.func,
  activeLevel: propTypes.number.isRequired,
  maxLevel: propTypes.number.isRequired,
  lockerAmount: propTypes.number.isRequired,
  initialSlide: propTypes.number.isRequired,
};

export default LevelSwiperMenu;
