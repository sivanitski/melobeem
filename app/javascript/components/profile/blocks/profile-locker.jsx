import propTypes from "prop-types";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import ChildContext from "../../../helpers/child-context";
import LockerImg from "../../../images/locker.svg";
import Locker from "../../animation/locker";

const ProfileLocker = ({ userId }) => {
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
      {currentChild?.currentCompetition ? (
        <Link to={`/profile/${userId}/next-competition`}>
          <LockerImg />
        </Link>
      ) : (
        <Locker />
      )}
    </div>
  );
};

ProfileLocker.propTypes = {
  userId: propTypes.number.isRequired,
};

export default ProfileLocker;
