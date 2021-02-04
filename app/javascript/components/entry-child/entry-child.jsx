import "./style.less";

import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import RightArrow from "../../images/arrow-right.svg";
import Share from "../../images/share.svg";

const EntryChild = ({ child }) => {
  return (
    <div className="entry">
      <div className="entry__img">
        <img src={child.avatar} />
        <div className="entry__share">
          <Share />
        </div>
      </div>
      <div className="entry__name headline--medium">{child.name}</div>
      <Link to={`/entry/${child.id}/vote`} className="button entry__button">
        Vote
      </Link>

      <Link to={`/entry/${child.id}/voters`} className="entry__voters">
        <div className="entry__voters__list">
          {child.mainVoters.map((mainVoter) => {
            return (
              <div key={mainVoter.id} className="entry__voters__item">
                <img src={mainVoter.avatar} />
              </div>
            );
          })}
        </div>

        <RightArrow className="entry__voters__right-arrow" />
      </Link>
    </div>
  );
};

EntryChild.propTypes = {
  child: propTypes.shape({
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    avatar: propTypes.string.isRequired,
    likes: propTypes.number.isRequired,
    parentName: propTypes.string.isRequired,
    rank: propTypes.number.isRequired,
    mainVoters: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.string.isRequired,
        name: propTypes.string.isRequired,
        avatar: propTypes.string.isRequired,
      }).isRequired
    ),
  }).isRequired,
};

export default EntryChild;
