import propTypes from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ChildContext from "../../../helpers/child-context";
import PrizeIconSpin from "../../../images/prize-icon-spin.svg";
import PrizeIconVotes from "../../../images/prize-icon-votes.svg";

const PurchaseNotification = ({ payload, entryId, entryName }) => {
  const { currentChild } = useContext(ChildContext);

  return (
    <div className="notification-item">
      <div className="notification-item__img">
        {payload.spinsCount ? <PrizeIconSpin /> : <PrizeIconVotes />}
      </div>
      <div className="notification-item__text text-grey">
        You bought
        <span className="notification-item__value text-black">
          {payload.spinsCount
            ? ` ${payload.spinsCount} spinners`
            : ` ${payload.votes} votes `}
        </span>
        {currentChild?.id !== entryId && !payload.spinsCount && (
          <>
            {" "}
            for
            <Link
              className="notification-item__value text-black"
              to={`/entry/${entryId}`}
            >
              {entryName}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

PurchaseNotification.propTypes = {
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
    propTypes.shape({}),
  ]),
  entryId: propTypes.number.isRequired,
  entryName: propTypes.string.isRequired,
};

export default PurchaseNotification;
