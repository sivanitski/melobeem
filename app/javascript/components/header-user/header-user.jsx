import "./style.less";

import React from "react";

import HeartRating from "../../images/heart-rating.svg";

const HeaderUser = () => {
  return (
    <div className="header-user">
      <div className="header-user__item">
        <div className="header-user__item__text text-tiny text-grey">Votes</div>
        <div className="header-user__item__number headline--medium text-pink">
          1
        </div>
      </div>
      <div className="half-circle header-user__level">
        <div className="header-user__level__text text-grey text-tiny">
          Level 1 <span className="text-tiny">(1/5)</span>
        </div>
        <HeartRating />
      </div>
      <div className="header-user__item">
        <div className="header-user__item__text text-tiny text-grey">Rank</div>
        <div className="header-user__item__number headline--medium text-pink">
          1,789
        </div>
      </div>
    </div>
  );
};

export default HeaderUser;
