import classNames from "classnames";
import propTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";

import {
  formatTimeInHoursMinutesAndSeconds,
  formatTimeInMinutesAndSeconds,
} from "../../helpers/date";
import TimerField from "./timer-field";

const Timer = ({ timeLeftInSeconds, handleFieldClick, type }) => {
  const timeLeftInMiliseconds = useMemo(() => 1000 * timeLeftInSeconds, [
    timeLeftInSeconds,
  ]);
  const [timeLeft, setTimeLeft] = useState(timeLeftInMiliseconds);

  useEffect(() => {
    setTimeLeft(timeLeftInSeconds * 1000);
  }, [timeLeftInSeconds]);

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

  const buttonClasses = classNames({
    "button entry__button": type === "entry",
    "vote-item__button": type === "votes",
    "vote-item__button--orange": type === "votes" && timeLeft > 0,
    "spinner__time text-grey": type === "spinner",
  });

  if (type === "entry") {
    return (
      <div className={buttonClasses} onClick={handleFieldClick}>
        <TimerField
          id="vote_from_entry_page"
          text={
            timeLeft > 0
              ? `Free vote in ${formatTimeInMinutesAndSeconds(timeLeft)}`
              : "Vote"
          }
        />
      </div>
    );
  }

  if (type === "spinner") {
    return (
      <TimerField
        classes={buttonClasses}
        id="free_spinner_for_user"
        text={
          timeLeft > 0
            ? `Free spin in ${formatTimeInHoursMinutesAndSeconds(timeLeft)}`
            : null
        }
      />
    );
  }

  if (type === "votes") {
    return (
      <TimerField
        classes={buttonClasses}
        id="free_vote_for_entry"
        text={
          timeLeftInMiliseconds > 0
            ? `${formatTimeInMinutesAndSeconds(timeLeft)}`
            : "Free"
        }
        handleClick={timeLeft > 0 ? () => {} : handleFieldClick}
      />
    );
  }

  return null;
};

Timer.propTypes = {
  timeLeftInSeconds: propTypes.number,
  handleFieldClick: propTypes.func,
  type: propTypes.string.isRequired,
};

export default Timer;
