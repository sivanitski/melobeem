import "./style.less";

import React, { useContext, useState } from "react";
import { Redirect } from "react-router";

import ChildContext from "../../helpers/child-context";
import InfoImage from "../../images/info-sign.svg";
import { Footer } from "../footer";
import { InfoBlock } from "../info-block";
import { LevelSwiperMenu } from "../level-swiper-menu";
import LevelContent from "./screens/level-content";

const LEVEL_TITLE_INFO = "What are Levels?";
const LEVEL_TEXT_INFO =
  "Progress through the levels when you gain more votes. Each new level unlocks a prize!";

const Level = () => {
  const { currentChild } = useContext(ChildContext);

  if (!currentChild) {
    return <Redirect to="/" />;
  }

  const [activeLevel, setActiveLevel] = useState(currentChild.level);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleSlideCLick = (index) => () => {
    setIsInfoOpen(false);
    setActiveLevel(index);
  };

  return (
    <>
      <div className="level">
        <LevelSwiperMenu
          handleSlideCLick={handleSlideCLick}
          maxLevel={currentChild.level}
          activeLevel={activeLevel}
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
      <Footer />
    </>
  );
};

export default Level;
