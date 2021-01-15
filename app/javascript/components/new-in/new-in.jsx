import React from 'react';
import propTypes from 'prop-types';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.scss';
import './style.less';

const NewIn = ({competitors}) => {
  return (
    <div className="new-in">
      <div className="new-in__header">
        <h2 className="new-in__header__title headline--medium">New in</h2>
        <div className="new-in__header__text text-pink">See All</div>
      </div>

      <Swiper 
        className="new-in__swiper swiper"
        spaceBetween={8}
        slidesPerView={`auto`}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >

        {competitors.map((it) => {
          return (
            <SwiperSlide className="swiper__item" key={it.ID}>
              <div className="swiper__item__img">
                <img src={it.PHOTO}/>
              </div>
              <div className="swiper__item__name text-grey">
                {it.NAME}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

NewIn.propTypes = {
  competitors: propTypes.arrayOf(propTypes.shape({
    ID: propTypes.number.isRequired,
    NAME: propTypes.string.isRequired,
    PHOTO: propTypes.string.isRequired})).isRequired,
};

export default NewIn;
