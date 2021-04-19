import propTypes from "prop-types";
import React, { useEffect, useState } from "react";

import {
  formatTimeInHoursMinutesAndSeconds,
  formatTimeInMinutesAndSeconds,
} from "../../helpers/date";

const Timer = ({ timeLeftInSeconds, handleFreeVoteClick, type }) => {
  const timeLeftInMiliseconds = 1000 * timeLeftInSeconds;
  const [timeLeft, setTimeLeft] = useState(timeLeftInMiliseconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      return () => {};
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1000);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft]);

  if (type === "votes") {
    if (timeLeft > 0) {
      return (
        <div className="vote-item__button vote-item__button--orange">
          {formatTimeInMinutesAndSeconds(timeLeft)}
        </div>
      );
    }

    return (
      <div className="vote-item__button" onClick={handleFreeVoteClick}>
        Free
      </div>
    );
  }

  if (timeLeft > 0) {
    return (
      <div className="spinner__time text-grey">
        {formatTimeInHoursMinutesAndSeconds(timeLeft)}
      </div>
    );
  }

  return null;
};

Timer.propTypes = {
  timeLeftInSeconds: propTypes.number.isRequired,
  handleFreeVoteClick: propTypes.func.isRequired,
  type: propTypes.string,
};

export default Timer;
