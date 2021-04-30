import propTypes from "prop-types";
import React from "react";

import InviteNotification from "./notification-type/notification-invite";
import PurchaseNotification from "./notification-type/notification-purchase";
import UnlockNotification from "./notification-type/notification-unlock";
import VoteNotification from "./notification-type/notification-vote";

const ProfileNotificationItem = ({ notification }) => {
  switch (notification.sourceType) {
    case "unlock":
      return (
        <UnlockNotification
          prize={notification.payload.prize}
          level={notification.payload.level}
        />
      );
    case "purchase":
      return (
        <PurchaseNotification
          payload={notification.payload}
          entryId={notification.entryId}
          entryName={notification.entryName}
        />
      );
    case "vote":
      return (
        <VoteNotification
          imageUrl={notification.imageUrl}
          entryId={notification.entryId}
          entryName={notification.entryName}
        />
      );
    case "invitation":
      return <InviteNotification payload={notification.payload} />;
    default:
      return null;
  }
};

ProfileNotificationItem.propTypes = {
  notification: propTypes.shape({
    id: propTypes.number.isRequired,
    createdAtDate: propTypes.string.isRequired,
    entryId: propTypes.number.isRequired,
    entryName: propTypes.string.isRequired,
    sourceType: propTypes.string.isRequired,
    imageUrl: propTypes.string,
    payload: propTypes.oneOfType([
      propTypes.shape({
        spinsCount: propTypes.number.isRequired,
      }),
      propTypes.shape({
        votes: propTypes.number.isRequired,
        userEntry: propTypes.bool.isRequired,
      }),
      propTypes.shape({
        votes: propTypes.number.isRequired,
        userEntry: propTypes.bool.isRequired,
      }),
      propTypes.shape({
        level: propTypes.number.isRequired,
        prize: propTypes.string.isRequired,
      }),
      propTypes.shape({
        prize: propTypes.number.isRequired,
        referrer: propTypes.shape({
          name: propTypes.string.isRequired,
          id: propTypes.number.isRequired,
        }),
      }),
      propTypes.shape({}),
    ]),
  }),
};

export default ProfileNotificationItem;
