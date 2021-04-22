import "swiper/swiper.less";

import React from "react";
import { Link } from "react-router-dom";

import defaultProptypes from "../../default-proptypes";
import IconHeart from "../../images/icon-heart.svg";

const CompetitorsItem = ({ competitor }) => {
  return (
    <div className="competitors-item" key={competitor.id}>
      <Link to={`/entry/${competitor.id}`}>
        <div className="competitors__wrapper">
          <div className="competitors-item__img">
            <img src={competitor.imageUrl} />
          </div>
          <div className="competitors-item__names">
            <div className="competitors-item__child text-black">
              {competitor.name}
            </div>
            <div className="competitors-item__parent text-smaller text-grey">
              {competitor.username}
            </div>
          </div>
          <div className="competitors-item__info">
            <div className="competitors-item__likes">
              <IconHeart className="svg-pink" />
              <div className="text-smaller text-pink">
                {competitor.totalVotes}
              </div>
            </div>
            <div className="competitors-item__place text-small text-grey">
              {competitor.rank}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

CompetitorsItem.propTypes = {
  competitor: defaultProptypes.CHILD,
};

export default CompetitorsItem;
