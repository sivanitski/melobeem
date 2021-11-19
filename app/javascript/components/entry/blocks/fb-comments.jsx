import propTypes from "prop-types";
import React from "react";
import EntryComment from "./entry-comments";

const FbComment = ({ childId }) => {
  return (
    <div className="facebook__comments">
      <EntryComment childId={childId} numPosts="15" width="100%" />
    </div>
  );
};

FbComment.propTypes = {
  childId: propTypes.number.isRequired,
};

export default FbComment;
