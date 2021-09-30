import "./style.less";

import propTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router";

import {
  calcDaysLeft,
  calcHoursLeft,
  calcMinutesLeft,
} from "../../helpers/date";
import { formatMoneyWithCurrency } from "../../helpers/utils";

const CompetitionInfo = ({ timeLeft, prize, prizeCurrency }) => {
  const history = useHistory();

  const infoTitle = () => {
    if (calcDaysLeft(timeLeft) === 0) {
      if (calcHoursLeft(timeLeft) === 0) {
        return "Minutes left";
      } else {
        return "Hours left";
      }
    } else {
      return "Days left";
    }
  };

  const timeLeftCalc = () => {
    if (calcDaysLeft(timeLeft) === 0) {
      if (calcHoursLeft(timeLeft) === 0) {
        return calcMinutesLeft(timeLeft);
      } else {
        return calcHoursLeft(timeLeft);
      }
    } else {
      return calcDaysLeft(timeLeft);
    }
  };

  return (
    <div className="competition-info">
      <div className="competition-info__item">
        <div className="competition-info__item__title text-grey">
          {infoTitle()}
        </div>
        <div className="competition-info__item__title headline--medium text-pink">
          {timeLeftCalc()}
        </div>
      </div>
      <div
        className="competition-info__item"
        onClick={() => history.push("/competition-info/prizes")}
      >
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
