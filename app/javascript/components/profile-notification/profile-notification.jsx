import "./style.less";

import { useRequest } from "ahooks";
import groupBy from "lodash.groupby";
import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import { createAPI } from "../../api";
import { formatDateNotification } from "../../helpers/date";
import UserContext from "../../helpers/user-context";
import GoBack from "../../images/go-back.svg";
import { Error } from "../error";
import { Footer } from "../footer";
import { Loading } from "../loading";
import { ProfileNotificationItem } from "../profile-notification-item";

const ProfileNotification = () => {
  const { user } = useContext(UserContext);
  const api = createAPI();

  if (!user) {
    <Redirect to="/" />;
  }

  const getNotifications = () => {
    return api.get("/notifications");
  };

  const { data: notifications, error, loading } = useRequest(getNotifications, {
    formatResult: (res) => res.data.notifications,
  });

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Loading />;
  }

  const notificationGropedByDate = groupBy(notifications, "createdAtDate");

  return (
    <>
      <div className="notification">
        <h1 className="headline--small notification__title">Notification</h1>

        <Link to="/profile" className="go-back">
          <GoBack />
        </Link>
        <div className="notification__list">
          {Object.keys(notificationGropedByDate).map((date) => (
            <React.Fragment key={date}>
              <div className="notification__date headline">
                {formatDateNotification(date)}
              </div>
              {notificationGropedByDate[date].map((notification) => (
                <ProfileNotificationItem
                  notification={notification}
                  key={notification.id}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileNotification;
