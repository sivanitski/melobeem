import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useContext } from "react";
import { useHistory, withRouter } from "react-router";

import { api } from "../../../api";
import ChildContext from "../../../helpers/child-context";
import { calcDaysLeft } from "../../../helpers/date";
import { makePluralForm } from "../../../helpers/utils";
import GoBack from "../../../images/go-back.svg";
import LockerImg from "../../../images/locker.svg";
import LockerUnlockedImg from "../../../images/locker-unlocked.svg";
import Loader from "../../animation/loader";
import { Error } from "../../error";
import { Footer } from "../../footer";

const NextCompetition = () => {
  const { currentChild } = useContext(ChildContext);
  const history = useHistory();
  const isClosed = currentChild?.currentCompetition;

  const getCompetition = () => {
    return api.get(`/competitions/current`);
  };

  const { data, error, loading } = useRequest(getCompetition, {
    formatResult: (res) => res.data.competition,
  });

  const handleSignUp = () => {
    if (isClosed) return;

    history.push("/sign-up");
  };

  const handleSignUpLastBaby = () => {
    if (isClosed || !currentChild) return;

    history.push("/sign-up", { step: 2, name: currentChild.name });
  };

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="next-competition">
        <div onClick={() => history.goBack()} className="go-back">
          <GoBack />
        </div>

        <div className="entry-prize__img">
          <div className="next-competition__img">
            {isClosed ? <LockerImg /> : <LockerUnlockedImg />}
          </div>
        </div>
        <div className="next-competition__title headline--medium">
          {isClosed ? "Competition locked" : "The competition is open!"}
        </div>
        <div className="next-competition__text text-grey">
          {isClosed
            ? "Each new competition unlocks a secret prize!"
            : "Enter and get your secret prize!"}
        </div>
        {isClosed && (
          <div className="next-competition__text text-grey">
            The next competition launches in {calcDaysLeft(data.endsAt)}{" "}
            {makePluralForm("day", calcDaysLeft(data.endsAt))}
          </div>
        )}

        <div className="next-competition__buttons">
          <button
            className={`button next-competition__button ${
              isClosed && "form__button--disabled"
            }`}
            type="button"
            onClick={handleSignUpLastBaby}
          >
            Enter competition
          </button>
          <div
            className="next-competition__another-baby text-grey text-small"
            onClick={handleSignUp}
          >
            Enter with another baby
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

NextCompetition.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }),
};

export default withRouter(NextCompetition);
