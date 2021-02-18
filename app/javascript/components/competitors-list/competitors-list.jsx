import "swiper/swiper.less";
import "./style.less";

import propTypes from "prop-types";
import React from "react";

import defaultProptypes from "../../default-proptypes";
import { CompetitorsItem } from "../competitors-item";

const CompetitorsList = ({ competitors }) => {
  return (
    <>
      {competitors.map((competitor) => (
        <CompetitorsItem competitor={competitor} key={competitor.id} />
      ))}
    </>
  );
};

CompetitorsList.propTypes = {
  competitors: propTypes.arrayOf(defaultProptypes.CHILD).isRequired,
};

export default CompetitorsList;
