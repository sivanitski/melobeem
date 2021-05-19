import propTypes from "prop-types";
import React, { useEffect, useRef } from "react";

const FbComment = ({ childId }) => {
  const fbRef = useRef(null);
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse(fbRef.current);
    }
  }, []);
  return (
    <div ref={fbRef} className="facebook__comments">
      <div
        className="fb-comments"
        data-href={`${global.window.location.origin}/entries/${childId}`}
        data-width="100%"
      />
    </div>
  );
};

FbComment.propTypes = {
  childId: propTypes.number.isRequired,
};

export default FbComment;
