import React, { useContext } from "react";
import { useHistory } from "react-router";

import ChildContext from "../../../helpers/child-context";

const ProfileLocker = () => {
  const { currentChild } = useContext(ChildContext);
  const history = useHistory();

  const handleLockerClick = () => {
    if (currentChild?.currentCompetition) {
      return;
    }

    history.push("/sign-up");
  };
  return (
    <div
      className="profile-children__item profile-children__item--locker"
      onClick={handleLockerClick}
    >
      <span> {currentChild?.currentCompetition ? "Closed" : "Open"}</span>
    </div>
  );
};

export default ProfileLocker;
