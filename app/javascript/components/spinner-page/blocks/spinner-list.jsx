import propTypes from "prop-types";
import React from "react";

import SpinnerOrange from "../../../images/spinner-orange-small.svg";
import SpinnerPurple from "../../../images/spinner-purple-small.svg";
import SpinnerTitle from "./spinner-title";
const spinOptions = [
  { price: "6", amount: "5" },
  { price: "9", amount: "10" },
];

const SpinnerList = ({ handlePriceClick }) => {
  return (
    <div className="spinner">
      <SpinnerTitle />
      <div className="spinner-list">
        {spinOptions.map((spinOption, index) => (
          <div className="spinner-item" key={spinOption.amount}>
            <div className="spinner-item__img">
              {index % 2 ? <SpinnerOrange /> : <SpinnerPurple />}
            </div>
            <div className="spinner-item__text">{spinOption.amount} Spins</div>
            <div
              className="button spinner-item__button"
              onClick={() => handlePriceClick(spinOption)}
            >
              £ {spinOption.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

SpinnerList.propTypes = {
  handlePriceClick: propTypes.func.isRequired,
};

export default SpinnerList;
