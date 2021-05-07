import "./style.less";

import { useRequest } from "ahooks";
import React, { useContext, useState } from "react";
import { Redirect } from "react-router";

import { api } from "../../api";
import ChildContext from "../../helpers/child-context";
import InfoImage from "../../images/info-sign.svg";
import { Footer } from "../footer";
import { InfoBlock } from "../info-block";
import { LevelSwiperMenu } from "../level-swiper-menu";
import { Loading } from "../loading";
import LevelContent from "./screens/level-content";

const LEVEL_TITLE_INFO = "What are Levels?";
const LEVEL_TEXT_INFO =
  "Progress through the levels when you gain more votes. Each new level unlocks a prize!";

const Level = () => {
  const { currentChild } = useContext(ChildContext);

  if (!currentChild) {
    return <Redirect to="/" />;
  }

  const getMaxLevel = () => {
    return api.get("/entries/max_level_entry");
  };

  const { data: maxLevel, loading } = useRequest(getMaxLevel, {
    formatResult: (res) => res.data,
  });

  const [activeLevel, setActiveLevel] = useState(currentChild.level);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleSlideCLick = (index) => () => {
    setIsInfoOpen(false);
    setActiveLevel(index);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="level">
        <LevelSwiperMenu
          handleSlideCLick={handleSlideCLick}
          maxLevel={currentChild.level}
          activeLevel={activeLevel}
          lockerAmount={maxLevel - currentChild.level + 1}
          initialSlide={activeLevel > 4 ? activeLevel - 4 : activeLevel}
        />
        <div className="level__wrapper">
          <div className="level__title headline--medium">
            Level {activeLevel}
            <div className="level__info" onClick={() => setIsInfoOpen(true)}>
              <InfoImage />
            </div>
          </div>

          {isInfoOpen && (
            <InfoBlock
              title={LEVEL_TITLE_INFO}
              text={LEVEL_TEXT_INFO}
              handleInfoClose={() => setIsInfoOpen(false)}
            />
          )}

          <LevelContent activeLevel={activeLevel} />
        </div>
      </div>
      <Footer active="levels" />
    </>
  );
};

export default Level;
