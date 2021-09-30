import gsap from "gsap";
import propTypes from "prop-types";
import React, { useEffect, useState } from "react";

import { getAnimationLevel, getVoteValueFromLevel } from "../../helpers/level";
import HeartLevel from "../heart-animation/heart-level";
import LevelUpAnimation from "../heart-animation/level-up-animation";

const HeaderUserLevel = ({
  levelStart,
  levelEnd,
  totalVotesEnd,
  totalVotesStart,
  levelUpWrapperClass,
  animationParams,
  delayOfHeartAnim,
  // isLvlUp
}) => {
  const [isLvlUpAnimPlay, setIsLvlUpAnimPlay] = useState(false);
  const lvlUpAnimDuration = 3000;
  const [currentHeartLvl, setCurrentHeartLvl] = useState(-1);
  const [currentVotes, setCurrentVotes] = useState(totalVotesStart);
  const [currentVotesOfLvl, setCurrentVotesOfLvl] = useState(totalVotesEnd);
  const [currentLvl, setCurrentLvl] = useState(levelStart || 1);
  const [timerId1, setTimerId1] = useState(null);
  const [timerId2, setTimerId2] = useState(null);

  useEffect(() => {
    const lvl = getAnimationLevel(totalVotesStart, levelStart);
    setCurrentHeartLvl(lvl);
    const levelTo = levelEnd === 1 ? 1 : levelEnd + 1;
    const voutLvl = getVoteValueFromLevel(levelTo);
    setCurrentVotesOfLvl(voutLvl);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timerId1);
    };
  }, [timerId1]);

  useEffect(() => {
    return () => {
      clearTimeout(timerId2);
    };
  }, [timerId2]);

  const heartAnimationSimple = (from, to, totalVotesStart, totalVotesEnd) => {
    const cont = { heart: from, votes: totalVotesStart };
    setCurrentHeartLvl(to);
    gsap.to(cont, {
      heart: to,
      votes: totalVotesEnd,
      duration: 0.3,
      roundProps: "votes",
      onUpdate: function () {
        setCurrentVotes(cont.votes);
      },
    });
  };

  const heartAnimationLvlUp = (
    from,
    to,
    totalVotesStart,
    totalVotesEnd,
    voteValueFromLevelStart,
    voteValueFromLevelEnd
  ) => {
    setCurrentHeartLvl(0);
    setTimeout(() => {
      setCurrentHeartLvl(to);
    }, 3300);
    const cont = {
      heart: from,
      votes: totalVotesStart,
      lvlVotes: voteValueFromLevelStart,
    };
    gsap
      .timeline({
        onUpdate: () => {
          // setCurrentHeartLvl(cont.heart);
          setCurrentVotes(cont.votes);
          setCurrentVotesOfLvl(cont.lvlVotes);
        },
      })
      .fromTo(
        cont,
        { heart: from, votes: totalVotesStart },
        {
          heart: 0,
          votes: voteValueFromLevelStart,
          roundProps: "votes",
          duration: 0.3,
        }
      )
      .fromTo(
        cont,
        { lvlVotes: voteValueFromLevelStart },
        {
          lvlVotes: voteValueFromLevelEnd,
          duration: 1,
          roundProps: "lvlVotes",
          onComplete: () => {
            setCurrentLvl(levelEnd);
          },
        },
        0.3
      )
      .fromTo(
        cont,
        { heart: 1 },
        { heart: to, votes: totalVotesEnd, roundProps: "votes", duration: 0.3 },
        3.3
      );
  };

  useEffect(() => {
    if (animationParams?.isAnimationPlay) {
      setTimerId1(
        setTimeout(() => {
          const animationLevelStart = getAnimationLevel(
            totalVotesStart,
            levelStart
          );
          const animationLevelEnd = getAnimationLevel(totalVotesEnd, levelEnd);
          const isLvlUp =
            animationParams.levelStart !== animationParams.levelEnd;
          if (isLvlUp) {
            heartAnimationLvlUp(
              animationLevelStart,
              animationLevelEnd,
              totalVotesStart,
              totalVotesEnd,
              getVoteValueFromLevel(levelStart + 1),
              getVoteValueFromLevel(levelEnd + 1)
            );
            setIsLvlUpAnimPlay(true);

            setTimerId2(
              setTimeout(() => {
                setIsLvlUpAnimPlay(false);
              }, lvlUpAnimDuration)
            );
          } else {
            heartAnimationSimple(
              animationLevelStart,
              animationLevelEnd,
              totalVotesStart,
              totalVotesEnd
            );
          }
        }, delayOfHeartAnim)
      );
    }
  }, [animationParams?.isAnimationPlay, animationParams?.votesEnd]);

  return (
    <div className="half-circle header-user__level">
      <div className="header-user__text text-grey text-tiny">
        Level {currentLvl} ({currentVotes}/{currentVotesOfLvl})
      </div>

      {/* {isHeartPlay ? (
        levelEnd > levelStart ? (
          <HeartAnimationLevelUpdated
            animationLevelStart={animationLevelStart}
            animationLevelEnd={animationLevelEnd}
            levelStart={levelStart}
            levelEnd={levelEnd}
          />
        ) : (
          <HeartAnimationSmall
            animationLevelStart={animationLevelStart}
            animationLevelEnd={animationLevelEnd}
          />
        )
      ) : ( */}
      <HeartLevel animationLevel={currentHeartLvl} />
      {/* )} */}

      {isLvlUpAnimPlay &&
        levelEnd > levelStart &&
        (levelUpWrapperClass ? (
          <div className={levelUpWrapperClass}>
            <LevelUpAnimation />
          </div>
        ) : (
          <LevelUpAnimation />
        ))}
    </div>
  );
};

HeaderUserLevel.propTypes = {
  levelStart: propTypes.number,
  levelEnd: propTypes.number.isRequired,
  totalVotesEnd: propTypes.number.isRequired,
  totalVotesStart: propTypes.number,
  isAnimation: propTypes.bool,
  setAnimationStep: propTypes.func,
  animationParams: propTypes.object,
  animationStep: propTypes.number,
  levelUpWrapperClass: propTypes.string,

  delayOfHeartAnim: propTypes.number,
};

HeaderUserLevel.defaultProps = {
  delayOfHeartAnim: 3400,
};

export default HeaderUserLevel;
