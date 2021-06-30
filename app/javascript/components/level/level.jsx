import "./style.less";

import { useRequest } from "ahooks";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

import { api } from "../../api";
import ChildContext from "../../helpers/child-context";
import UserContext from "../../helpers/user-context";
import InfoImage from "../../images/info-sign.svg";
import Loader from "../animation/loader";
import { Footer } from "../footer";
import { InfoBlock } from "../info-block";
import { LevelSwiperMenu } from "../level-swiper-menu";
import { Popup } from "../popup";
import LevelContent from "./screens/level-content";

const LEVEL_TITLE_INFO = "What are Levels?";
const LEVEL_TEXT_INFO =
  "Progress through the levels when you gain more votes. Each new level unlocks a prize!";

const Level = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const { currentChild, setCurrentChild } = useContext(ChildContext);
  const [prizes, setPrizes] = useState(null);

  useEffect(() => {
    async function loadCurrentChild() {
      const {
        data: { entry },
      } = await api.get("/entries/current");
      setCurrentChild(entry);

      if (entry) {
        const {
          data: { prizes: prisezData },
        } = await api.get(`/entries/${entry.id}/prizes`);
        setPrizes(prisezData);
        setActiveLevel(entry.level);
      }
    }

    loadCurrentChild();
  }, []);

  const getMaxLevel = () => {
    return api.get("/entries/max_level_entry");
  };

  const { data: maxLevel, loading } = useRequest(getMaxLevel, {
    formatResult: (res) => res.data,
  });

  const [activeLevel, setActiveLevel] = useState(currentChild?.level);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleSlideCLick = (index) => () => {
    setIsInfoOpen(false);
    setActiveLevel(index);
  };

  const popupType = !user ? "level-not-login" : "level-not-entered";

  if (!currentChild?.currentCompetition) {
    return (
      <div className="level">
        <LevelSwiperMenu
          maxLevel={0}
          activeLevel={0}
          lockerAmount={20}
          initialSlide={0}
        />
        <Popup handlePopupClose={() => history.push("/")} type={popupType} />
        <Footer active="levels" />
      </div>
    );
  }
  if (loading) {
    return <Loader />;
  }

  const calculateNotSpentPrizes = () => {
    if (!prizes) return null;

    return prizes.filter((prize) => prize.spent === false);
  };

  const notSpentPrizes = calculateNotSpentPrizes();

  return (
    <>
      <div className="level">
        <LevelSwiperMenu
          notSpentPrizes={notSpentPrizes}
          handleSlideCLick={handleSlideCLick}
          maxLevel={currentChild.level}
          activeLevel={activeLevel}
          lockerAmount={maxLevel - currentChild.level + 1}
          initialSlide={activeLevel - 4}
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
