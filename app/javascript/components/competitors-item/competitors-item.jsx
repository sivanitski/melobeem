import "swiper/swiper.less";

import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import IconHeart from "../../images/icon-heart.svg";

const CompetitorsItem = ({ competitor }) => {
  return (
    <div className="competitors__item" key={competitor.id}>
      <Link to={`entry/${competitor.id}`}>
        <div className="competitors__wrapper">
          <div className="competitors__item__img">
            <img src={competitor.avatar} />
          </div>
          <div className="competitors__item__names">
            <div className="competitors__item__names__child text-black">
              {competitor.name}
            </div>
            <div className="competitors__item__names__parent text-smaller text-grey">
              {competitor.parentName}
            </div>
          </div>
          <div className="competitors__item__info">
            <div className="competitors__item__info__likes">
              <IconHeart />
              <div className="text-smaller text-pink">{competitor.likes}</div>
            </div>
            <div className="competitors__item__info__place text-small text-grey">
              {competitor.rank}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

CompetitorsItem.propTypes = {
  competitor: propTypes.shape({
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    avatar: propTypes.string.isRequired,
    likes: propTypes.number.isRequired,
    parentName: propTypes.string.isRequired,
    rank: propTypes.number.isRequired,
  }).isRequired,
  history: propTypes.shape({ push: propTypes.func.isRequired }),
};

export default CompetitorsItem;
