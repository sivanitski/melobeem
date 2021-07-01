import React, { useContext } from "react";
import { useHistory } from "react-router";

import ChildContext from "../../../helpers/child-context";
import LockerImg from "../../../images/locker.svg";
import Locker from "../../animation/locker";

const ProfileLocker = () => {
  const { currentChild } = useContext(ChildContext);
  const history = useHistory();

  const handleLockerClick = () => {
    history.push("/next-competition");
  };

  return (
    <div
      className="profile-children__item profile-children__item--locker"
      onClick={handleLockerClick}
    >
      {currentChild?.currentCompetition ? <LockerImg /> : <Locker />}
    </div>
  );
};

export default ProfileLocker;
