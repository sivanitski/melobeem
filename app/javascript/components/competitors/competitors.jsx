import "swiper/swiper.less";
import "./style.less";

import propTypes from "prop-types";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import defaultProptypes from "../../default-proptypes";
import ChildContext from "../../helpers/child-context";
import { defineLevels, filterChildrenByLevel } from "../../helpers/level";
import InfoIcon from "../../images/info-sign.svg";
import SearchIcon from "../../images/search-icon.svg";
import { CompetitorsList } from "../competitors-list";
import { CompetitorsSwiperMenu } from "../competitors-swiper-menu";

const Competitors = ({ competitors }) => {
  let { maxLevel, minLevel } = defineLevels(competitors);
  const { currentChild } = useContext(ChildContext);

  if (currentChild?.level) {
    minLevel = currentChild.level;
  }

  const [shownCompetitors, setShownCompetitors] = useState(
    filterChildrenByLevel(competitors, minLevel, maxLevel)
  );

  const onSliderClick = (index) => {
    setShownCompetitors(filterChildrenByLevel(competitors, index, maxLevel));
  };

  return (
    <div className="competitors">
      <div className="competitors__title headline--medium">
        Leaderboard
        <div className="leaderboard-icons">
          <Link
            to="/competition-info"
            className="leaderboard-icons__item leaderboard-icons__item--info"
          >
            <InfoIcon />
          </Link>
          <Link
            to="/search"
            className="leaderboard-icons__item leaderboard-icons__item--search"
          >
            <SearchIcon />
          </Link>
        </div>
      </div>
      <CompetitorsSwiperMenu
        onSliderClick={onSliderClick}
        maxLevel={maxLevel}
        minLevel={minLevel}
      />
      <CompetitorsList
        competitors={shownCompetitors}
        messageNoChildren="There’s no one on this level right now."
      />
    </div>
  );
};

Competitors.propTypes = {
  competitors: propTypes.arrayOf(defaultProptypes.CHILD).isRequired,
};

export default Competitors;
