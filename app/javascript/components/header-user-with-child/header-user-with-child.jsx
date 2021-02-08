import "./style.less";

import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import GoBack from "../../images/go-back.svg";
import HeartRating from "../../images/heart-rating.svg";

const HeaderUserWithChild = ({ child }) => {
  return (
    <div className="header-user header-user--with-info">
      <Link to={`/entry/${child.id}`} className="voters__go-back">
        <GoBack />
      </Link>
      <div className="header-user__list header-user__list--shadow">
        <div className="header-user__item">
          <div className="header-user__item__text text-tiny text-grey">
            Votes
          </div>
          <div className="header-user__item__number headline--medium text-pink">
            {child.likes}
          </div>
        </div>

        <div className="header-user__item header-user__item--user">
          <div className="header-user__img">
            <img src={child.avatar} />
          </div>
          <div className="header-user__name">{child.name}</div>
        </div>

        <div className="header-user__item">
          <div className="header-user__item__text text-tiny text-grey">
            Rank
          </div>
          <div className="header-user__item__number headline--medium text-pink">
            {child.rank}
          </div>
        </div>
      </div>

      <div className="half-circle header-user__level">
        <div className="header-user__level__text text-grey text-tiny">
          Level 1 <span className="text-tiny">(1/5)</span>
        </div>
        <HeartRating />
      </div>
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
