import classNames from "classnames";
import propTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

import { api } from "../../../api";
import ChildContext from "../../../helpers/child-context";
import UserContext from "../../../helpers/user-context";
import { defineColorClass, definePrizeParameters } from "./prize-parameters";

const LevelWithPrize = ({ prize, setAnimationParams }) => {
  const { setUser } = useContext(UserContext);
  const [prizeTime, setPrizeTime] = useState(null);
  const { currentChild, setCurrentChild } = useContext(ChildContext);
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

  const updateUser = async () => {
    const {
      data: { user: updatedUser },
    } = await api.get("users/current");
    setUser((user) => ({
      ...user,
      anySpins: updatedUser.anySpins,
    }));
  };

  const handleTakePrize = async () => {
    if (isTimePrizeActivated) {
      return;
    }

    await api.put(`/entries/${currentChild.id}/take_prize`, {
      level: prize.level,
    });

    if (prize.sourceType === "vote") {
      const {
        data: { entry },
      } = await api.get("/entries/current");

      setAnimationParams({
        votesStart: currentChild.totalVotes,
        rankStart: currentChild.rank,
        levelStart: currentChild.level,
        isAnimationPlay: true,
        votesEnd: entry.totalVotes,
        rankEnd: entry.rank,
        levelEnd: entry.level,
        value: entry.totalVotes - currentChild.totalVotes,
      });

      setCurrentChild(entry);
    }

    if (prize.sourceType === "spin") {
      updateUser();
      history.push("/spinner");
    }

    if (prize.sourceType === "min") {
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
    // value: propTypes.number.isRequired,
    level: propTypes.number.isRequired,
  }),
  setAnimationParams: propTypes.func,
};

export default LevelWithPrize;
