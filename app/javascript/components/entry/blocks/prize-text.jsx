import propTypes from "prop-types";
import React from "react";

import { makePluralForm } from "../../../helpers/utils";

const PrizeText = ({
  moneyCondition,
  spinCondition,
  moneyPrize,
  spinPrize,
}) => {
  return (
    <>
      {moneyCondition && `£ ${moneyPrize} `}
      {moneyCondition && spinCondition && "+ "}
      {spinCondition && `${spinPrize} ${makePluralForm("spin", spinPrize)}`}
    </>
  );
};

PrizeText.propTypes = {
  moneyCondition: propTypes.bool.isRequired,
  spinCondition: propTypes.bool.isRequired,
  moneyPrize: propTypes.number.isRequired,
  spinPrize: propTypes.number.isRequired,
};

export default PrizeText;
