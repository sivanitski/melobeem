import "swiper/swiper.less";
import "./style.less";

import propTypes from "prop-types";
import React from "react";

import { CompetitorsItem } from "../competitors-item";

const CompetitorsList = ({ competitors }) => {
  return (
    <>
      {competitors.map((competitor) => {
        const index = competitors.findIndex(
          (competitor) => competitor.id === competitor.id
        );
        return (
          <CompetitorsItem
            competitor={competitor}
            index={index}
            key={competitor.id}
          />
        );
      })}
    </>
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
