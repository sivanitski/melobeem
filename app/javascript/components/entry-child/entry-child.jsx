import "./style.less";

import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import defaultProptypes from "../../default-proptypes";
import Share from "../../images/share.svg";
import { EntryVoters } from "../entry-voters";

const EntryChild = ({ child, voters }) => {
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

      {voters && <EntryVoters childId={child.id} voters={voters} />}
    </div>
  );
};

EntryChild.propTypes = {
  child: defaultProptypes.CHILD,
  voters: propTypes.arrayOf(defaultProptypes.VOTER),
};

export default EntryChild;
