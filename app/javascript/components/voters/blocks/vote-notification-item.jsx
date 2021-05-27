import propTypes from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../../helpers/user-context";
import Notification from "./notification";

const VoteNotificationItem = ({ notification }) => {
  const { user } = useContext(UserContext);

  switch (notification.sourceType) {
    case "user":
      return (
        <Link to={`/profile/${notification.userId}`}>
          <Notification
            image={notification.avatarUrl}
            voteAmount={notification.voteAmount}
            text={notification.userName}
          />
        </Link>
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
    case "shop":
      const text = `${
        user?.id === notification.userId ? "You" : `${notification.userName}`
      } bought ${notification.voteAmount} votes`;
      return (
        <Link to={`/profile/${notification.userId}`}>
          <Notification
            voteAmount={notification.voteAmount}
            text={text}
            type={notification.sourceType}
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
