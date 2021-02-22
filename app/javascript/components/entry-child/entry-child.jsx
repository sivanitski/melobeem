import "./style.less";

import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import defaultProptypes from "../../default-proptypes";
import RightArrow from "../../images/arrow-right.svg";
import Share from "../../images/share.svg";

const EntryChild = ({ child, voters }) => {
  const lastThreeVoters = voters.slice(0, 3);
  return (
    <div className="entry">
      <div className="entry__img">
        <img src={child.imageUrl} />
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
          {lastThreeVoters.map((voter) => (
            <div key={voter.id} className="entry__voters__item">
              <img src={voter.avatarUrl} />
            </div>
          ))}
        </div>

        <RightArrow className="entry__voters__right-arrow" />
      </Link>
    </div>
  );
};

EntryChild.propTypes = {
  child: defaultProptypes.CHILD,
  voters: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      avatarUrl: propTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default EntryChild;
