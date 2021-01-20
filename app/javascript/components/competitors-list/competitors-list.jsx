import React, {useState} from 'react';
import propTypes from 'prop-types';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.less';
import './style.less';
import {LEVEL_INTERVALS, MAX_LEVEL, filterChildrenByLevel} from '../../helpers/level';

const CompetitorsList = ({competitors}) => {

  const [activeLevel, setActiveLevel] = useState(1);
  const [shownCompetitors, setshownCompetitors] = useState(filterChildrenByLevel(competitors, 1))


  const handleSlideCLick = (index) => () => {
    setActiveLevel(index);
    setshownCompetitors(filterChildrenByLevel(competitors, index));
  }

  const renderSlides = () => {
    let slides = [];

    // for now assume that it will be 6 levels
    for (let i = 1; i < MAX_LEVEL + 1; i++) {
      slides.push(
        <SwiperSlide className={`competitors__swiper__item headline--medium ${activeLevel === i ? `active` : `text-pink`}`} key={i} onClick={handleSlideCLick(i)}>
        {i}
      </SwiperSlide>
      );
    }
    return <>{slides}</>;
  }

  return (
    <div className="competitors">
      <div className="competitors__title headline--medium">Leaderboard </div>
      <Swiper 
        className="competitors__swiper swiper"
        spaceBetween={1}
        slidesPerView={`auto`}
      >
       {renderSlides()}
      </Swiper>

      <div className="competitors__level">
        <div className="competitors__level__amount">Level {activeLevel}</div>
        <div className="competitors__level__comment text-grey">(From {LEVEL_INTERVALS[activeLevel]} to {LEVEL_INTERVALS[activeLevel + 1]} Votes) </div>
      </div>

      {shownCompetitors.map((shownCompetitor) => {
        return (
          <div className="competitors__item" key={shownCompetitor.id}>
            <div className="competitors__wrapper">
              <div className="competitors__item__img"><img src={shownCompetitor.avatar}/></div>
              <div className="competitors__item__names">
                <div className="competitors__item__names__child">{shownCompetitor.name}</div>
                <div className="competitors__item__names__parent text-smaller text-grey">{shownCompetitor.parentName}</div>
              </div>
              <div className="competitors__item__info">
                <div className="competitors__item__info__likes">
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.78823 10.8148L6 11L6.21176 10.8148C10.7647 6.92593 12 5.55556 12 3.33333C12 1.48148 10.5882 0 8.82353 0C7.37647 0 6.56471 0.851852 6 1.51852C5.43529 0.851852 4.62353 0 3.17647 0C1.41177 0 0 1.48148 0 3.33333C0 5.55556 1.23529 6.92593 5.78823 10.8148Z" fill="#FF7098"/>
                  </svg>
                  <div className="text-smaller text-pink">{shownCompetitor.likes}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

    </div>
  );
}

CompetitorsList.propTypes = {
  competitors: propTypes.arrayOf(propTypes.shape({
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    avatar: propTypes.string.isRequired,
    likes: propTypes.number.isRequired,
    parentName: propTypes.string.isRequired
  })).isRequired,
};

export default CompetitorsList;
