import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import defaultProptypes from "../../default-proptypes";
import RightArrow from "../../images/arrow-right.svg";

const EntryVoters = ({ childId, voters }) => {
  const lastThreeVoters = voters.slice(0, 3);
  return (
    <Link to={`/entry/${childId}/voters`} className="entry__voters">
      <div className="entry__voters__list">
        {lastThreeVoters.map((voter) => (
          <div key={voter.id} className="entry__voters__item">
            <img src={voter.avatarUrl} />
          </div>
        ))}
      </div>

      <RightArrow className="entry__voters__right-arrow" />
    </Link>
  );
};

EntryVoters.propTypes = {
  childId: propTypes.number.isRequired,
  voters: propTypes.arrayOf(defaultProptypes.CHILD),
};

export default EntryVoters;
