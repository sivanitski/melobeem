import classNames from "classnames";
import propTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

import { api } from "../../../api";
import ChildContext from "../../../helpers/child-context";
import { defineColorClass, definePrizeParameters } from "./prize-parameters";

const LevelWithPrize = ({ prize }) => {
  const [prizeTime, setPrizeTime] = useState(null);
  const { currentChild } = useContext(ChildContext);
  const history = useHistory();

  useEffect(() => {
    if (prize.sourceType === "min") {
      api.get(`/entries/${currentChild.id}/prize_time`).then((res) => {
        setPrizeTime(res?.data?.message);
      });
    }
  }, []);

  const prizeParams = definePrizeParameters(prize, prizeTime);

  const isTimePrizeActivated = prize.sourceType === "min" && prizeTime;

  const handleTakePrize = async () => {
    if (isTimePrizeActivated) {
      return;
    }

    await api.put(`/entries/${currentChild.id}/take_prize`, {
      level: prize.level,
    });

    if (prize.sourceType === "spin") {
      history.push("/spinner");
    } else {
      history.push(`/entry/${currentChild.id}`);
    }
  };

  const levelPrizesClasses = classNames("level-prizes__text text-grey", {
    "text-red": isTimePrizeActivated,
  });

  const levelButtonClasses = classNames(
    `button level-prizes__button ${defineColorClass("background", prize)}`,
    {
      "background-light": isTimePrizeActivated,
    }
  );

  const levelTitleClasses = classNames(
    `level-prizes__title headline--medium ${defineColorClass("text", prize)}`
  );

  return (
    <div className="level-prizes">
      <div className="level-prizes__avatar">{prizeParams.image}</div>
      <div className={levelTitleClasses}>{prizeParams.title}</div>
      <div className={levelPrizesClasses}>{prizeParams.text}</div>
      <button
        className={levelButtonClasses}
        onClick={handleTakePrize}
        type="button"
      >
        Take prize
      </button>
    </div>
  );
};

LevelWithPrize.propTypes = {
  prize: propTypes.shape({
    sourceType: propTypes.string.isRequired,
    spent: propTypes.bool.isRequired,
    value: propTypes.number.isRequired,
    level: propTypes.number.isRequired,
  }),
};

export default LevelWithPrize;
