import "swiper/swiper.less";
import "./style.less";

import propTypes from "prop-types";
import React, { useState } from "react";

import defaultProptypes from "../../default-proptypes";
import { filterChildrenByLevel } from "../../helpers/level";
import { CompetitorsList } from "../competitors-list";
import { CompetitorsSwiperMenu } from "../competitors-swiper-menu";

const Competitors = ({ competitors }) => {
  const [shownCompetitors, setShownCompetitors] = useState(
    filterChildrenByLevel(competitors, 1)
  );

  const onSliderClick = (index) => {
    setShownCompetitors(filterChildrenByLevel(competitors, index));
  };

  return (
    <div className="competitors">
      <div className="competitors__title headline--medium">Leaderboard </div>
      <CompetitorsSwiperMenu onSliderClick={onSliderClick} />
      <CompetitorsList competitors={shownCompetitors} />
    </div>
  );
};

Competitors.propTypes = {
  competitors: propTypes.arrayOf(defaultProptypes.CHILD).isRequired,
};

export default Competitors;
