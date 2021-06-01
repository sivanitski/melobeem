import propTypes from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ChildContext from "../../../../helpers/child-context";
import { definePrizeTitle } from "../../../level/screens/prize-parameters";
import Notification from "./notification";

const ProfileNotificationItem = ({ notification }) => {
  const { currentChild } = useContext(ChildContext);
  switch (notification.sourceType) {
    case "unlock":
      return (
        <Notification
          type={notification.sourceType}
          title={`Level ${notification.payload.level} completed`}
          subtitle={`${definePrizeTitle(notification.payload.prize)}`}
          subsubtitle="awarded"
        />
      );
    case "purchase":
      return (
        <Link to={`/entry/${notification.entryId}`}>
          <Notification
            type={notification.payload.spinsCount ? "buySpins" : "buyVotes"}
            title="You bought"
            subtitle={
              notification.payload.spinsCount
                ? ` ${notification.payload.spinsCount} spinners`
                : ` ${notification.payload.votes} votes `
            }
            subsubtitle={
              currentChild?.id !== notification.entryId &&
              !notification.payload.spinsCount
                ? `for ${notification.entryName}`
                : ""
            }
          />
        </Link>
      );
    case "vote":
      return (
        <Link to={`/entry/${notification.entryId}`}>
          <Notification
            image={notification.imageUrl}
            type={notification.sourceType}
            title="You voted for"
            subtitle={notification.entryName}
          />
        </Link>
      );
    case "invitation":
      return (
        <Link to={`/profile/${notification.payload.referrer.id}`}>
          <Notification
            type={notification.sourceType}
            title={`${notification.payload.prize} votes`}
            subtitle="for inviting"
            subsubtitle={notification.payload.referrer.name}
          />
        </Link>
      );
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
