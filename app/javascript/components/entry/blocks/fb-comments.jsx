import propTypes from "prop-types";
import React from "react";
import { Comments } from "react-facebook";

const FbComment = ({ childId }) => {
  return (
    <div className="facebook__comments">
      <Comments
        href={`${global.window.location.origin}/entries/${childId}`}
        numPosts="15"
        width="100%"
      />
    </div>
  );
};

FbComment.propTypes = {
  childId: propTypes.number.isRequired,
};

export default FbComment;
