import "./style.less";

import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import defaultProptypes from "../../default-proptypes";
import ShareImage from "../../images/share.svg";
import { EntryVoters } from "../entry-voters";
import { FacebookShare } from "../facebook-share";

const EntryChild = ({ child, voters }) => {
  return (
    <div className="entry">
      <div className="entry__img">
        <img src={child.imageUrl} />

        <FacebookShare childId={child.id} classes="entry__share">
          <ShareImage />
        </FacebookShare>
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
