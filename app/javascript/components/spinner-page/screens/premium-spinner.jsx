import React, { useState } from "react";

import { api } from "../../../api";

const PremiumSpinner = () => {
  const [prize, setPrize] = useState(null);

  const handleSpinStop = async () => {
    const res = await api.post("/spins");
    setPrize(res.data.value);
  };

  return (
    <div>
      <div>premium spinner</div>
      <div className="button" onClick={handleSpinStop}>
        SPIN
      </div>
      {prize && `You win ${prize} votes`}
    </div>
  );
};

export default PremiumSpinner;
