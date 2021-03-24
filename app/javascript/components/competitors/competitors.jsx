import "swiper/swiper.less";
import "./style.less";

import propTypes from "prop-types";
import React, { useState } from "react";

import defaultProptypes from "../../default-proptypes";
import {
  defineMaxLevel,
  filterChildrenByLevel,
  findAllExsistingLevels,
} from "../../helpers/level";
import { CompetitorsList } from "../competitors-list";
import { CompetitorsSwiperMenu } from "../competitors-swiper-menu";

const Competitors = ({ competitors }) => {
  const maxLevel = defineMaxLevel(competitors);

  const [shownCompetitors, setShownCompetitors] = useState(
    filterChildrenByLevel(competitors, 1, maxLevel)
  );

  const onSliderClick = (index) => {
    setShownCompetitors(filterChildrenByLevel(competitors, index, maxLevel));
  };

  const levels = findAllExsistingLevels(competitors);

  return (
    <div className="competitors">
      <div className="competitors__title headline--medium">Leaderboard </div>
      <CompetitorsSwiperMenu
        onSliderClick={onSliderClick}
        maxLevel={maxLevel}
        competitors={competitors}
        levels={levels}
      />
      <CompetitorsList competitors={shownCompetitors} />
    </div>
  );
};

Competitors.propTypes = {
  competitors: propTypes.arrayOf(defaultProptypes.CHILD).isRequired,
};

export default Competitors;
