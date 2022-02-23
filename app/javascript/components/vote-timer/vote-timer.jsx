import propTypes from "prop-types";
import React, { useEffect, useState } from "react";

import { formatTimeInMinutesAndSeconds } from "../../helpers/date";

const VoteTimer = ({ timeLeftInSeconds, handlePrizeClick }) => {
  const timeLeftInMiliseconds = 1000 * timeLeftInSeconds;
  const [timeLeft, setTimeLeft] = useState(timeLeftInMiliseconds);
  useEffect(() => {
    if (timeLeft <= 0) {
      return () => {};
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeftInMiliseconds);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft]);

  if (timeLeft > 0) {
    return (
      <div className="vote-item__button vote-item__button--orange">
        {formatTimeInMinutesAndSeconds(timeLeft)}
      </div>
    );
  }

  return (
    <div className="vote-item__button" onClick={handlePrizeClick}>
      Free
    </div>
  );
};

VoteTimer.propTypes = {
  timeLeftInSeconds: propTypes.number.isRequired,
  handlePrizeClick: propTypes.func.isRequired,
};

export default VoteTimer;
