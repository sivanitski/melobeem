import "./style.less";

import propTypes from "prop-types";
import React from "react";
import { useHistory, withRouter } from "react-router";
import { Link } from "react-router-dom";

import { api } from "../../api";
import GiftImg from "../../images/gift-icon.svg";
import GoBack from "../../images/go-back.svg";
import PrizeText from "../entry/blocks/prize-text";
import { Footer } from "../footer";

const EntryTakePrize = ({
  location: { state },
  match: {
    params: { id },
  },
}) => {
  const history = useHistory();

  if (!state) {
    history.push(`/entries/${id}`);
  }

  const handlePrizeTake = async () => {
    const res = await api.put(`/users/${id}/take_additional_prize`);
    if (res) {
      history.push(`/entry/${id}`);
    }
  };

  return (
    <>
      <div className="entry-prize">
        <Link to={`/entry/${id}`} className="go-back">
          <GoBack />
        </Link>
        <div className="entry-prize__img">
          <GiftImg />
        </div>

        <div className="entry-prize__text text-grey">
          <div className="entry-prize__title headline text-pink">
            Congratulation
          </div>
          <div className="entry-prize__subtitle">You have won prize</div>
          <div className="entry-prize__main-prize text-pink">
            <PrizeText
              moneyPrize={state.moneyPrize}
              spinPrize={state.spinPrize}
              moneyCondition={state.moneyCondition}
              spinCondition={state.spinCondition}
            />
          </div>
          <div className="entry-prize__money-prize">
            To claim your money prize please contact Melobbem by email{" "}
            <strong>
              <a className="text-black" href="mailto:malobeem@gmail.com">
                malobeem@gmail.com
              </a>
            </strong>{" "}
            or text us on Facebook
          </div>
        </div>

        {state.spinCondition && (
          <button
            className="button entry__button entry-prizу__button"
            onClick={handlePrizeTake}
          >
            Claim {state.spinPrize} Spins
          </button>
        )}
      </div>
      <Footer />
    </>
  );
};

EntryTakePrize.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }),
  location: propTypes.shape({
    state: propTypes.shape({
      moneyPrize: propTypes.number,
      spinPrize: propTypes.number,
      moneyCondition: propTypes.bool,
      spinCondition: propTypes.bool,
    }),
  }),
};

export default withRouter(EntryTakePrize);
