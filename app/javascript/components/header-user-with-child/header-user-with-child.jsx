import "./style.less";

import React from "react";
import { Link } from "react-router-dom";

import defaultProptypes from "../../default-proptypes";
import GoBack from "../../images/go-back.svg";
import { HeaderUserItem } from "../header-user-item";
import { HeaderUserLevel } from "../header-user-level";

const HeaderUserWithChild = ({ child }) => {
  child.rank = 1;
  return (
    <div className="header-user header-user--with-info">
      <Link to={`/entry/${child.id}`} className="go-back">
        <GoBack />
      </Link>
      <div className="header-user__list header-user__list--shadow">
        <HeaderUserItem title="Votes" value={child.totalVotes} />
        <div className="header-user__item header-user__item--user">
          <div className="header-user__img">
            <img src={child.imageUrl} />
          </div>
          <div className="header-user__name">{child.name}</div>
        </div>
        <HeaderUserItem title="Rank" value={child.rank} />
      </div>
      <HeaderUserLevel level={child.level} totalVotes={child.totalVotes} />
    </div>
  );
};

HeaderUserWithChild.propTypes = {
  child: defaultProptypes.CHILD,
};

export default HeaderUserWithChild;
