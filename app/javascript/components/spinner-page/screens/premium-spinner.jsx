import propTypes from "prop-types";
import React, { useState } from "react";

import { api } from "../../../api";
import { makePluralForm } from "../../../helpers/utils";

const PremiumSpinner = ({ spinnerAmount }) => {
  const [prize, setPrize] = useState(null);

  const handleSpinStop = async () => {
    const res = await api.post("/spins");
    setPrize(res.data.value);
  };

  return (
    <div>
      <div>premium spinner</div>
      <div>{makePluralForm(`${spinnerAmount} spin`, spinnerAmount)}</div>
      <div className="button" onClick={handleSpinStop}>
        SPIN
      </div>
      {prize && `You win ${prize} votes`}
    </div>
  );
};

PremiumSpinner.propTypes = {
  spinnerAmount: propTypes.number.isRequired,
};

export default PremiumSpinner;
