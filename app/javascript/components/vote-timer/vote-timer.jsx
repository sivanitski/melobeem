import propTypes from "prop-types";
import React, { useEffect, useState } from "react";

import {
  calcTimeDuration,
  formatTimeInMinutesAndSeconds,
} from "../../helpers/date";

const VoteTimer = ({ date, handlePrizeClick }) => {
  const [timeLeft, setTimeLeft] = useState(calcTimeDuration(date));
  useEffect(() => {
    if (timeLeft <= 0) {
      return () => {};
    }

    const timer = setTimeout(() => {
      setTimeLeft(calcTimeDuration(date));
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
  date: propTypes.number.isRequired,
  handlePrizeClick: propTypes.func.isRequired,
};

export default VoteTimer;
