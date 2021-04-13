import "swiper/swiper.less";

import propTypes from "prop-types";
import React from "react";

import defaultProptypes from "../../default-proptypes";
import { CompetitorsItem } from "../competitors-item";
import { WinnerItem } from "../winner-item";

const CompetitorsList = ({ competitors, messageNoChildren }) => {
  return (
    <>
      {competitors.length > 0 ? (
        competitors.map((child) =>
          child.name ? (
            <CompetitorsItem competitor={child} key={child.id} />
          ) : (
            <WinnerItem winner={child} key={child.id} />
          )
        )
      ) : (
        <div className="competitors__empty text-grey">{messageNoChildren}</div>
      )}
    </>
  );
};

CompetitorsList.propTypes = {
  competitors: propTypes.arrayOf(
    propTypes.oneOfType([
      defaultProptypes.CHILD,
      defaultProptypes.WINNER_OF_COMPETITION,
    ])
  ),
  messageNoChildren: propTypes.string.isRequired,
};

export default CompetitorsList;
