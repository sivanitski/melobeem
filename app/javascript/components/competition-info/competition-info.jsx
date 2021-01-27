import "./style.less";

import propTypes from "prop-types";
import React from "react";

import { calcDaysLeft } from "../../helpers/date";

const CompetitionInfo = ({ timeLeft, prize }) => {
  return (
    <div className="competition-info">
      <div className="competition-info__item">
        <div className="competition-info__item__title text-grey">Days left</div>
        <div className="competition-info__item__title headline--medium text-pink">
          {calcDaysLeft(timeLeft)}
        </div>
      </div>
      <div className="competition-info__item">
        <div className="competition-info__item__title text-grey">Prize</div>
        <div className="competition-info__item__title headline--medium text-pink">
          £{Math.round(prize * 100) / 100}
        </div>
      </div>
    </div>
  );
};

CompetitionInfo.propTypes = {
  timeLeft: propTypes.string.isRequired,
  prize: propTypes.string.isRequired,
};

export default CompetitionInfo;
