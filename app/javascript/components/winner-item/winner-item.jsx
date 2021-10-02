import "swiper/swiper.less";

import React from "react";
import { Link } from "react-router-dom";

import defaultProptypes from "../../default-proptypes";
import { formatMoneyWithCurrency } from "../../helpers/utils";
import IconGift from "../../images/icon-gift.svg";

const WinnerItem = ({ winner }) => {
  return (
    <div className="competitors-item" key={winner.id}>
      <Link to={`/previous-winners/${winner.id}`}>
        <div className="competitors__wrapper">
          <div className="competitors-item__img">
            <img src={winner.winnerImageUrl} />
          </div>
          <div className="competitors-item__names">
            <div className="competitors-item__child text-black">
              {winner.title}
            </div>
            <div className="competitors-item__parent text-smaller text-grey">
              {winner.entriesCount} Babie’s
            </div>
          </div>
          <div className="competitors-item__info">
            <div className="competitors-item__place text-small text-grey">
              <IconGift />
              <div className="text-smaller text-pink">
                won{" "}
                {formatMoneyWithCurrency(
                  winner.prizeCents,
                  winner.prizeCurrency
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

WinnerItem.propTypes = {
  winner: defaultProptypes.WINNER_OF_COMPETITION,
};

export default WinnerItem;
