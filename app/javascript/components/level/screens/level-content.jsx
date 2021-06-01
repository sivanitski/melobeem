import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useContext, useEffect } from "react";

import { api } from "../../../api";
import ChildContext from "../../../helpers/child-context";
import {
  getAnimationLevel,
  getVoteIntervalFromLevel,
} from "../../../helpers/level";
import { HeartAnimationBig } from "../../heart-animation";
import LevelWithPrize from "./level-with-prize";

const LevelContent = ({ activeLevel }) => {
  const { currentChild } = useContext(ChildContext);
  const getPrizeByLevel = () => {
    return api.get(`/entries/${currentChild.id}/prize_by_level`, {
      params: {
        entryId: currentChild.id,
        level: activeLevel,
      },
    });
  };

  const { data, loading, run } = useRequest(getPrizeByLevel, {
    formatResult: (res) => res.data.prize,
  });

  useEffect(() => {
    run();
  }, [activeLevel]);

  const renderPrizeByLevel = () => {
    if (!data) {
      return (
        <>
          <div className="level__interval text-grey">
            {getVoteIntervalFromLevel(activeLevel)}
          </div>
          <HeartAnimationBig animationLevel={0} />
        </>
      );
    }

    return <LevelWithPrize prize={data} />;
  };

  if (activeLevel === currentChild?.level) {
    const animationLevel = getAnimationLevel(
      currentChild.totalVotes,
      currentChild.level
    );

    return (
      <>
        <div className="level__interval text-grey">
          {getVoteIntervalFromLevel(activeLevel)}
        </div>
        <HeartAnimationBig animationLevel={animationLevel} />
        <div className="level__child-votes text-pink">
          {currentChild.totalVotes}
        </div>
      </>
    );
  }

  if (loading) {
    return null;
  }
  return renderPrizeByLevel();
};

LevelContent.propTypes = {
  activeLevel: propTypes.number.isRequired,
};

export default LevelContent;
