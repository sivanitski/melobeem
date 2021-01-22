import "swiper/swiper.less";
import "./style.less";

import classNames from "classnames";
import propTypes from "prop-types";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  filterChildrenByLevel,
  LEVEL_INTERVALS,
  MAX_LEVEL,
} from "../../helpers/level";
import { CompetitorsItem } from "../competitors-item";

const CompetitorsList = ({ competitors }) => {
  const [activeLevel, setActiveLevel] = useState(1);
  const [shownCompetitors, setshownCompetitors] = useState(
    filterChildrenByLevel(competitors, 1)
  );

  const handleSlideCLick = (index) => () => {
    setActiveLevel(index);
    setshownCompetitors(filterChildrenByLevel(competitors, index));
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
    <div className="competitors">
      <div className="competitors__title headline--medium">Leaderboard </div>
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
      {shownCompetitors.map((shownCompetitor) => {
        const index = competitors.findIndex(
          (competitor) => competitor.id === shownCompetitor.id
        );
        return (
          <CompetitorsItem
            competitor={shownCompetitor}
            index={index}
            key={shownCompetitor.id}
          />
        );
      })}
    </div>
  );
};

CompetitorsList.propTypes = {
  competitors: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      avatar: propTypes.string.isRequired,
      likes: propTypes.number.isRequired,
      parentName: propTypes.string.isRequired,
    })
  ).isRequired,
};

export default CompetitorsList;
