import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import Notification from "./notification";

const VoteNotificationItem = ({ notification }) => {
  switch (notification.sourceType) {
    case "user":
      return (
        <Notification
          image={notification.avatarUrl}
          voteAmount={notification.voteAmount}
          text={notification.userName}
        />
      );
    case "spinner":
      return (
        <Notification
          voteAmount={notification.voteAmount}
          text="Spinner"
          type={notification.sourceType}
        />
      );
    case "bonus":
      return (
        <Notification
          voteAmount={notification.voteAmount}
          text="Melobeem bonus "
          type={notification.sourceType}
        />
      );
    case "invitation":
      return (
        <Link to={`/profile/${notification.invitedUserId}`}>
          <Notification
            image={notification.invitedUserAvatarUrl}
            voteAmount={notification.voteAmount}
            text={`You invited ${notification.invitedUserName}`}
          />
        </Link>
      );
    default:
      return null;
  }
};

VoteNotificationItem.propTypes = {
  notification: propTypes.shape({
    avatarUrl: propTypes.string,
    invitedUserAvatarUrl: propTypes.string,
    invitedUserId: propTypes.number,
    invitedUserName: propTypes.string,
    sourceType: propTypes.string.isRequired,
    userId: propTypes.number,
    userName: propTypes.string,
    voteAmount: propTypes.number.isRequired,
    voteDate: propTypes.string.isRequired,
  }),
};

export default VoteNotificationItem;
