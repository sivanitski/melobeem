import "./style.less";

import React from "react";

import defaultProptypes from "../../default-proptypes";
import { HeaderUserItem } from "../header-user-item";
import { HeaderUserLevel } from "../header-user-level";

const HeaderUser = ({ child }) => {
  return (
    <div className="header-user">
      <div className="header-user__list">
        <HeaderUserItem title="Votes" value={child.totalVotes} />
        <HeaderUserLevel level={child.level} totalVotes={child.totalVotes} />
        <HeaderUserItem title="Rank" value={child.rank} />
      </div>
    </div>
  );
};

HeaderUser.propTypes = {
  child: defaultProptypes.CHILD,
};

export default HeaderUser;
