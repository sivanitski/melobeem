import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useContext } from "react";
import { Redirect, withRouter } from "react-router";
import { Link } from "react-router-dom";

import { api } from "../../../api";
import { calcDaysLeft } from "../../../helpers/date";
import UserContext from "../../../helpers/user-context";
import { makePluralForm } from "../../../helpers/utils";
import GoBack from "../../../images/go-back.svg";
import LockerImg from "../../../images/locker.svg";
import Loader from "../../animation/loader";
import { Error } from "../../error";
import { Footer } from "../../footer";

const NextCompetitionLocked = ({
  match: {
    params: { id },
  },
}) => {
  const { user } = useContext(UserContext);

  if (user?.id !== Number(id)) {
    return <Redirect to={`/profile/${id}`} />;
  }

  const getCompetition = () => {
    return api.get(`/competitions/current`);
  };

  const { data, error, loading } = useRequest(getCompetition, {
    formatResult: (res) => res.data.competition,
  });

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="next-competition">
        <Link to={`/profile/${id}`} className="go-back">
          <GoBack />
        </Link>

        <div className="entry-prize__img">
          <div className="next-competition__img">
            <LockerImg />
          </div>
        </div>
        <div className="next-competition__title headline--medium">
          Competition locked
        </div>
        <div className="next-competition__text text-grey">
          Each new competition unlocks a secret prize!
        </div>
        <div className="next-competition__text text-grey">
          The next competition launches in {calcDaysLeft(data.endsAt)}{" "}
          {makePluralForm("day", calcDaysLeft(data.endsAt))}
        </div>

        <button
          className="button next-competition__button form__button--disabled"
          type="button"
        >
          Enter competition
        </button>
      </div>
      <Footer />
    </>
  );
};

NextCompetitionLocked.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }),
};

export default withRouter(NextCompetitionLocked);
