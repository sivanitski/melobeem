import propTypes from "prop-types";
import React from "react";
import { Comments, FacebookProvider } from "react-facebook";

const FbComment = ({ childId }) => {
  return (
    <div className="facebook__comments">
      <FacebookProvider appId={process.env.FACEBOOK_APP_ID}>
        <Comments
          href={`${global.window.location.origin}/entries/${childId}`}
          numPosts="15"
          width="100%"
        />
      </FacebookProvider>
    </div>
  );
};

FbComment.propTypes = {
  childId: propTypes.number.isRequired,
};

export default FbComment;
