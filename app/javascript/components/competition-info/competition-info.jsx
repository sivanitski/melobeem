import "./style.less";

import propTypes from "prop-types";
import React from "react";

import { calcDaysLeft } from "../../helpers/date";
import { formatMoneyWithCurrency } from "../../helpers/utils";

const CompetitionInfo = ({ timeLeft, prize, prizeCurrency }) => {
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
          {formatMoneyWithCurrency(prize, prizeCurrency)}
        </div>
      </div>
    </div>
  );
};

CompetitionInfo.propTypes = {
  timeLeft: propTypes.string.isRequired,
  prize: propTypes.number.isRequired,
  prizeCurrency: propTypes.string.isRequired,
};

export default CompetitionInfo;
