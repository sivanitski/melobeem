import propTypes from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ChildContext from "../../../helpers/child-context";
import IconGift from "../../../images/icon-gift.svg";
import PrizeText from "./prize-text";

const CompetitionPrize = ({
  moneyPrize,
  spinPrize,
  isSpinPrizeSpent,
  childId,
}) => {
  const { currentChild } = useContext(ChildContext);
  const moneyCondition = moneyPrize > 0;
  const spinCondition = spinPrize > 0 && !isSpinPrizeSpent;

  if (moneyCondition || spinCondition) {
    return (
      <Link
        className="button entry_button-prize text-pink"
        type="button"
        to={{
          pathname: `/entry/${childId}/prize`,
          state: {
            moneyPrize: moneyPrize,
            spinPrize: spinPrize,
            moneyCondition: moneyCondition,
            spinCondition: spinCondition,
          },
        }}
      >
        <IconGift />
        <span>Prize</span>

        <PrizeText
          moneyCondition={moneyCondition}
          spinCondition={spinCondition}
          moneyPrize={moneyPrize}
          spinPrize={spinPrize}
        />
      </Link>
    );
  }

  if (!currentChild?.currentCompetition) {
    return (
      <Link className="entry-previous__enter" to="/next-competition">
        Enter again
      </Link>
    );
  }

  return null;
};

CompetitionPrize.propTypes = {
  moneyPrize: propTypes.number.isRequired,
  spinPrize: propTypes.number.isRequired,
  isSpinPrizeSpent: propTypes.bool.isRequired,
  childId: propTypes.number.isRequired,
};

export default CompetitionPrize;
