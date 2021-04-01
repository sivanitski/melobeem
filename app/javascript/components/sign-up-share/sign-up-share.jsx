import "./style.less";

import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { FacebookShare } from "../facebook-share";

const SignUpShare = ({ imagePreviewUrl, childId }) => {
  return (
    <div className="form-share">
      <div className="form-share__img">
        <img src={imagePreviewUrl} />
      </div>
      <div className="form-share__title headline--medium">Welcome!</div>
      <div className="form-share__text text-grey">
        Share your Baby photo on Facebook, ask your Friends to Vote. More Votes,
        more chance to win.
      </div>

      <FacebookShare
        childId={childId}
        classes="button button--facebook form-share__button"
      >
        Share on Facebook
      </FacebookShare>

      <Link
        to={`/entry/${childId}`}
        className="text-grey text-small form-share__text-enter"
      >
        Enter without sharing
      </Link>
    </div>
  );
};

SignUpShare.propTypes = {
  imagePreviewUrl: propTypes.string.isRequired,
  childId: propTypes.number.isRequired,
};

export default SignUpShare;
