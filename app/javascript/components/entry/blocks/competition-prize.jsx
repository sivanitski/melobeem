import propTypes from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ChildContext from "../../../helpers/child-context";
import IconGift from "../../../images/icon-gift.svg";
import PrizeText from "./prize-text";

const CompetitionPrize = ({
  moneyPrize,
  spinPrize,
  isSpinPrizeSpent,
  childId,
  user,
}) => {
  const { currentChild } = useContext(ChildContext);
  const moneyCondition = moneyPrize > 0;
  const spinCondition = spinPrize > 0 && !isSpinPrizeSpent;

  const trackEvent = (user, event, eventName, eventDetails) => {
    let json = JSON.stringify({
      tk: "riuerunb3UIBBINIn2in23ibbYB@UYBBoi4oon12b124",
      event: {
        site: "melobeem",
        event: event,
        user_id: user ? user.id : "",
        event_name: eventName,
        event_description: eventDetails,
        user_token: localStorage.getItem("tk"),
      },
    });

    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
    };

    fetch("http://localhost:3031/events", requestOptions);
  };

  if (moneyCondition || spinCondition) {
    return (
      <Link
        className="button entry_button-prize text-pink"
        type="button"
        to={{
          pathname: `/entry/${childId}/prize`,
          state: {
            moneyPrize: moneyPrize,
            spinPrize: spinPrize,
            moneyCondition: moneyCondition,
            spinCondition: spinCondition,
          },
        }}
      >
        <IconGift />
        <span>Prize</span>

        <PrizeText
          moneyCondition={moneyCondition}
          spinCondition={spinCondition}
          moneyPrize={moneyPrize}
          spinPrize={spinPrize}
        />
      </Link>
    );
  }

  if (!currentChild?.currentCompetition) {
    return (
      <div
        onClick={() => trackEvent(user, "click", "enter-again", currentChild)}
      >
        <Link className="entry-previous__enter" to="/next-competition">
          Enter again
        </Link>
      </div>
    );
  }

  return null;
};

CompetitionPrize.propTypes = {
  moneyPrize: propTypes.number.isRequired,
  spinPrize: propTypes.number.isRequired,
  isSpinPrizeSpent: propTypes.bool.isRequired,
  childId: propTypes.number.isRequired,
  user: propTypes.object,
};

export default CompetitionPrize;
