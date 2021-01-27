import "swiper/swiper.less";
import "./style.less";

import propTypes from "prop-types";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const NewIn = ({ competitors }) => {
  return (
    <div className="new-in">
      <div className="new-in__header">
        <h2 className="new-in__header__title headline--medium">New in</h2>
        <a href="" className="new-in__header__text text-pink">
          See All
        </a>
      </div>

      <Swiper
        className="new-in__swiper swiper"
        spaceBetween={8}
        slidesPerView={`auto`}
      >
        {competitors.map((competitor) => {
          return (
            <SwiperSlide className="swiper__item" key={competitor.id}>
              <div className="swiper__item__img">
                <img src={competitor.avatar} />
              </div>
              <div className="swiper__item__name text-grey">
                {competitor.name}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

NewIn.propTypes = {
  competitors: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      avatar: propTypes.string.isRequired,
    })
  ).isRequired,
};

export default NewIn;
