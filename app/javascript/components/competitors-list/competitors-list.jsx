import "swiper/swiper.less";

import propTypes from "prop-types";
import React from "react";

import defaultProptypes from "../../default-proptypes";
import { CompetitorsItem } from "../competitors-item";

const CompetitorsList = ({ competitors }) => {
  return (
    <>
      {competitors.length > 0 ? (
        competitors.map((competitor) => (
          <CompetitorsItem competitor={competitor} key={competitor.id} />
        ))
      ) : (
        <div className="competitors__empty text-grey">
          There’s no one on this level right now.
        </div>
      )}
    </>
  );
};

CompetitorsList.propTypes = {
  competitors: propTypes.arrayOf(defaultProptypes.CHILD).isRequired,
};

export default CompetitorsList;
