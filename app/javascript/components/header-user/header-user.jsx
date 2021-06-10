import "./style.less";

import propTypes from "prop-types";
import React from "react";

import defaultProptypes from "../../default-proptypes";
import { HeaderUserItem } from "../header-user-item";
import { HeaderUserLevel } from "../header-user-level";

const HeaderUser = ({ child, animationParams }) => {
  return (
    <div className="header-user">
      <div className="header-user__list">
        <HeaderUserItem
          title="Votes"
          value={child.totalVotes}
          isAnimationPlay={animationParams?.isAnimationPlay}
          numberStart={animationParams?.votesStart}
          numberEnd={animationParams?.votesEnd}
        />
        <HeaderUserLevel level={child.level} totalVotes={child.totalVotes} />
        <HeaderUserItem
          title="Rank"
          value={child.rank}
          isAnimationPlay={animationParams?.isAnimationPlay}
          numberStart={animationParams?.rankStart}
          numberEnd={animationParams?.rankEnd}
          isDecrease
        />
      </div>
    </div>
  );
};

HeaderUser.propTypes = {
  child: defaultProptypes.CHILD,
  animationParams: propTypes.shape({
    isAnimationPlay: propTypes.bool,
    votesStart: propTypes.number,
    votesEnd: propTypes.number,
    rankStart: propTypes.number,
    rankEnd: propTypes.number,
  }),
};

export default HeaderUser;
