import "./style.less";

import propTypes from "prop-types";
import React, { useEffect } from "react";
import { useHistory } from "react-router";

import defaultProptypes from "../../default-proptypes";
import GoBack from "../../images/go-back.svg";
import { HeaderUserItem } from "../header-user-item";
import { HeaderUserLevel } from "../header-user-level";

const HeaderUserWithChild = ({
  child,
  animationParams,
  isGoToVoteList,
  handleGoToVoteOptions,
  handleAnimationEnd,
  animationStep,
  setAnimationStep,
}) => {
  const history = useHistory();
  useEffect(() => {
    if (animationParams?.isAnimationPlay) {
      setAnimationStep(1);
    }
  }, [animationParams?.isAnimationPlay]);

  const calculateChildTotalVotes = () => {
    if (!animationParams?.isAnimationPlay) {
      return child.totalVotes;
    }

    if (animationStep <= 1) {
      return animationParams.votesStart;
    }

    return animationParams.votesEnd;
  };

  const calculateChildRank = () => {
    if (!animationParams?.isAnimationPlay) {
      return child.rank;
    }

    if (animationStep <= 3) {
      return animationParams.rankStart;
    }

    return animationParams.rankEnd;
  };

  const handleGoBackClick = () => {
    if (isGoToVoteList) {
      handleGoToVoteOptions();
    } else {
      history.push(`/entry/${child.id}`);
    }
  };

  return (
    <div className="header-user header-user--with-info">
      <div onClick={handleGoBackClick} className="go-back">
        <GoBack />
      </div>
      <div className="header-user__list header-user__list--shadow">
        <HeaderUserItem
          title="Votes"
          value={calculateChildTotalVotes()}
          isAnimationPlay={animationStep === 1}
          numberStart={animationParams?.votesStart}
          numberEnd={animationParams?.votesEnd}
          animationStep={animationStep}
          setAnimationStep={setAnimationStep}
        />
        <div className="header-user__item header-user__item--user">
          <div
            className="header-user__img"
            onClick={() => history.push(`/entry/${child.id}`)}
          >
            <img src={child.imageUrl} />
          </div>
          <div className="header-user__name">{child.name}</div>
        </div>
        <HeaderUserItem
          title="Rank"
          value={calculateChildRank()}
          isAnimationPlay={animationStep === 3}
          numberStart={animationParams?.rankStart}
          numberEnd={animationParams?.rankEnd}
          isDecrease
          animationStep={animationStep}
          setAnimationStep={setAnimationStep}
          handleAnimationEnd={handleAnimationEnd}
        />
      </div>
      <HeaderUserLevel
        levelStart={animationParams?.levelStart}
        levelEnd={
          animationParams?.isAnimationPlay
            ? animationParams?.levelEnd
            : child.level
        }
        totalVotesEnd={
          animationParams?.isAnimationPlay
            ? animationParams?.votesEnd
            : child.totalVotes
        }
        totalVotesStart={animationParams?.votesStart}
        isAnimation={animationStep === 2}
        animationStep={animationStep}
        setAnimationStep={setAnimationStep}
      />
    </div>
  );
};

HeaderUserWithChild.propTypes = {
  child: defaultProptypes.CHILD,

  animationParams: propTypes.shape({
    isAnimationPlay: propTypes.bool,
    votesStart: propTypes.number,
    votesEnd: propTypes.number,
    rankStart: propTypes.number,
    rankEnd: propTypes.number,
    levelStart: propTypes.number,
    levelEnd: propTypes.number,
  }),

  handleAnimationEnd: propTypes.func,
  isGoToVoteList: propTypes.bool,
  handleGoToVoteOptions: propTypes.func,
  animationStep: propTypes.number,
  setAnimationStep: propTypes.func,
};

export default HeaderUserWithChild;
