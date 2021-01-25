import "swiper/swiper.less";
import "./style.less";

import propTypes from "prop-types";
import React, { useState } from "react";

import { filterChildrenByLevel } from "../../helpers/level";
import { CompetitorsItem } from "../competitors-item";
import { CompetitorsSwiperMenu } from "../competitors-swiper-menu";

const CompetitorsList = ({ competitors }) => {
  const [shownCompetitors, setshownCompetitors] = useState(
    filterChildrenByLevel(competitors, 1)
  );

  const onSliderClick = (index) => {
    setshownCompetitors(filterChildrenByLevel(competitors, index));
  };

  return (
    <div className="competitors">
      <div className="competitors__title headline--medium">Leaderboard </div>
      <CompetitorsSwiperMenu onSliderClick={onSliderClick} />
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
