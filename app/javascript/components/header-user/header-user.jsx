import "./style.less";

import propTypes from "prop-types";
import React from "react";

import { HeaderUserItem } from "../header-user-item";
import { HeaderUserLevel } from "../header-user-level";

const HeaderUser = ({ child }) => {
  return (
    <div className="header-user">
      <div className="header-user__list">
        <HeaderUserItem title="Votes" value={child.likes} />
        <HeaderUserLevel />
        <HeaderUserItem title="Rank" value={child.rank} />
      </div>
    </div>
  );
};

HeaderUser.propTypes = {
  child: propTypes.shape({
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    avatar: propTypes.string.isRequired,
    likes: propTypes.number.isRequired,
    rank: propTypes.number.isRequired,
  }),
};

export default HeaderUser;
