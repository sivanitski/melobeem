import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useState } from "react";

import { api } from "../../../api";
import { makePluralForm } from "../../../helpers/utils";
import InfoImage from "../../../images/info-sign.svg";
import { InfoBlock } from "../../info-block";
import { Timer } from "../../timer";

const FREE_SPINNER_TITLE_INFO = "What is Spinner?";
const FREE_SPINNER_TEXT_INFO =
  "You get one complimentary spin every day to get some extra love from us!";

const SpinnerTitle = ({ spinnerType, spinnerAmount }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const getFreeSpinnerTime = () => {
    return api.get("/spins/time_to_free_spin");
  };

  const { data: timeFreeSpin, loading: timeLoading } = useRequest(
    getFreeSpinnerTime,
    {
      formatResult: (res) => res.data.message,
    }
  );

  return (
    <>
      <div className="spinner__title headline--medium">
        {spinnerType === "premium"
          ? `${makePluralForm(`${spinnerAmount} spin`, spinnerAmount)}`
          : "Love Spinner"}

        <div className="spinner__info" onClick={() => setIsInfoOpen(true)}>
          <InfoImage />
        </div>
      </div>

      {!timeLoading && !spinnerType && (
        <Timer
          timeLeftInSeconds={timeFreeSpin}
          handleFreeVoteClick={() => {}}
        />
      )}

      {isInfoOpen && (
        <InfoBlock
          title={FREE_SPINNER_TITLE_INFO}
          text={FREE_SPINNER_TEXT_INFO}
          handleInfoClose={() => setIsInfoOpen(false)}
        />
      )}
    </>
  );
};

SpinnerTitle.propTypes = {
  spinnerType: propTypes.string,
  spinnerAmount: propTypes.number,
};

export default SpinnerTitle;
