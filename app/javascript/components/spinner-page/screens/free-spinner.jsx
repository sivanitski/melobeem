import "./style.less";

import propTypes from "prop-types";
import React, { useState } from "react";

import { api } from "../../../api";
import InfoImage from "../../../images/info-sign.svg";
import SpinnerImage from "../../../images/spinner.svg";
import SpinnerPointer from "../../../images/stopper.svg";
import { InfoBlock } from "../../info-block";
import FreeSpinnerAnimation from "../spinner-animation/free-spinner-animation";

const SECTOR_ANGLE = 45;
const HALF_SECTOR_ANGLE = 23;
const FULL_ROUND = 360;

const FreeSpinner = ({ infoTitle, infoText }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isAnimationShown, setIsAnimationShown] = useState(false);
  const [angle, setAngle] = useState(0);
  const [prize, setPrize] = useState(null);

  const calculateAnimationAngle = (result) => {
    switch (result) {
      case 0:
        return HALF_SECTOR_ANGLE + SECTOR_ANGLE * 5 + FULL_ROUND * 3;
      case 1:
        return HALF_SECTOR_ANGLE + FULL_ROUND * 3;
      case 2:
        return HALF_SECTOR_ANGLE + SECTOR_ANGLE + FULL_ROUND * 3;
      case 3:
        return HALF_SECTOR_ANGLE + 7 * SECTOR_ANGLE + FULL_ROUND * 3;
      case 4:
        return HALF_SECTOR_ANGLE + 3 * SECTOR_ANGLE + FULL_ROUND * 3;
    }
  };

  const handleSpinStop = async () => {
    const res = await api.post("/spins");
    setAngle(calculateAnimationAngle(res.data.value));
    setIsAnimationShown(true);
    setPrize(res.data.value);
  };

  return (
    <div className="spinner">
      <div className="spinner__title headline--medium">
        Vote wheel
        <div className="spinner__info" onClick={() => setIsInfoOpen(true)}>
          <InfoImage />
        </div>
      </div>
      {isInfoOpen && (
        <InfoBlock
          title={infoTitle}
          text={infoText}
          handleInfoClose={() => setIsInfoOpen(false)}
        />
      )}

      <div className="free-spinner__image">
        <SpinnerPointer className="free-spinner__pointer" />
        {isAnimationShown ? (
          <FreeSpinnerAnimation angle={angle} />
        ) : (
          <SpinnerImage onClick={handleSpinStop} />
        )}
      </div>

      <div>{prize && `You win ${prize} votes`}</div>
    </div>
  );
};

FreeSpinner.propTypes = {
  infoTitle: propTypes.string.isRequired,
  infoText: propTypes.string.isRequired,
};

export default FreeSpinner;
