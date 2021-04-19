import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useState } from "react";

import { api } from "../../../api";
import InfoImage from "../../../images/info-sign.svg";
import SpinnerOrange from "../../../images/spinner-orange.svg";
import SpinnerPurple from "../../../images/spinner-purple.svg";
import { InfoBlock } from "../../info-block";
import { Timer } from "../../timer";
// These options will be taken from the backend later
const spinOptions = [
  { price: "6", amount: "5" },
  { price: "9", amount: "10" },
];

const SpinnerList = ({ handlePriceClick, infoTitle, infoText }) => {
  const getFreeSpinnerTime = () => {
    return api.get("/spins/time_to_free_spin");
  };

  const { data: timeFreeSpin, loading: timeLoading } = useRequest(
    getFreeSpinnerTime,
    {
      formatResult: (res) => res.data.message,
    }
  );

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  return (
    <div className="spinner">
      <div className="spinner__title headline--medium">
        Vote wheel
        <div className="spinner__info" onClick={() => setIsInfoOpen(true)}>
          <InfoImage />
        </div>
      </div>

      {!timeLoading && (
        <Timer
          timeLeftInSeconds={timeFreeSpin}
          handleFreeVoteClick={() => {}}
        />
      )}

      {isInfoOpen && (
        <InfoBlock
          title={infoTitle}
          text={infoText}
          handleInfoClose={() => setIsInfoOpen(false)}
        />
      )}
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
  infoTitle: propTypes.string.isRequired,
  infoText: propTypes.string.isRequired,
};

export default SpinnerList;
