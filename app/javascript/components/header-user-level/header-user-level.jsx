import React from "react";

import HeartRating from "../../images/heart-rating.svg";

const HeaderUserLevel = () => {
  return (
    <div className="half-circle header-user__level">
      <div className="header-user__level__text text-grey text-tiny">
        Level 1 <span className="text-tiny">(1/5)</span>
      </div>
      <HeartRating />
    </div>
  );
};

export default HeaderUserLevel;
