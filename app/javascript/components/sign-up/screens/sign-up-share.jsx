import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { FacebookShare } from "../../facebook-share";

const SignUpShare = ({ imagePreviewUrl, childId }) => {
  const trackEvent = (event, eventName) => {
    let json = JSON.stringify({
      tk: "riuerunb3UIBBINIn2in23ibbYB@UYBBoi4oon12b124",
      event: {
        site: "melobeem",
        event: event,
        event_name: eventName,
        user_token: localStorage.getItem("tk"),
      },
    });

    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
    };

    fetch("http://localhost:3031/events", requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));
  };

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

      <div onClick={() => trackEvent("click", "enter-share-on-fb")}>
        <FacebookShare
          childId={childId}
          classes="button button--facebook form-share__button entering_share"
        >
          Share on Facebook
        </FacebookShare>
      </div>

      <div onClick={() => trackEvent("click", "enter-without-sharing")}>
        <Link
          to={`/entry/${childId}`}
          id="entering_without_share"
          className="text-grey text-small form-share__text-enter"
        >
          Enter without sharing
        </Link>
      </div>
    </div>
  );
};

SignUpShare.propTypes = {
  imagePreviewUrl: propTypes.string.isRequired,
  childId: propTypes.number.isRequired,
};

export default SignUpShare;
