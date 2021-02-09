import "./style.less";

import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import GoBack from "../../images/go-back.svg";
import { HeaderUserItem } from "../header-user-item";
import { HeaderUserLevel } from "../header-user-level";

const HeaderUserWithChild = ({ child }) => {
  return (
    <div className="header-user header-user--with-info">
      <Link to={`/entry/${child.id}`} className="voters__go-back">
        <GoBack />
      </Link>
      <div className="header-user__list header-user__list--shadow">
        <HeaderUserItem title="Votes" value={child.likes} />
        <div className="header-user__item header-user__item--user">
          <div className="header-user__img">
            <img src={child.avatar} />
          </div>
          <div className="header-user__name">{child.name}</div>
        </div>
        <HeaderUserItem title="Rank" value={child.rank} />
      </div>
      <HeaderUserLevel />
    </div>
  );
};

HeaderUserWithChild.propTypes = {
  child: propTypes.shape({
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    avatar: propTypes.string.isRequired,
    likes: propTypes.number.isRequired,
    rank: propTypes.number.isRequired,
  }),
};

export default HeaderUserWithChild;
