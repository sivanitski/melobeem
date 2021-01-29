import "./style.less";

import propTypes from "prop-types";
import React from "react";

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
      <button className="button entry__button">Vote</button>
      <div className="entry__voters"></div>
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
  }).isRequired,
};

export default EntryChild;
