import "./style.less";

import React from "react";

import defaultProptypes from "../../default-proptypes";
import { HeaderUserItem } from "../header-user-item";
import { HeaderUserLevel } from "../header-user-level";

const HeaderUser = ({ child }) => {
  child.rank = 1;
  return (
    <div className="header-user">
      <div className="header-user__list">
        <HeaderUserItem title="Votes" value={child.totalVotes} />
        <HeaderUserLevel />
        <HeaderUserItem title="Rank" value={child.rank} />
      </div>
    </div>
  );
};

HeaderUser.propTypes = {
  child: defaultProptypes.CHILD,
};

export default HeaderUser;
