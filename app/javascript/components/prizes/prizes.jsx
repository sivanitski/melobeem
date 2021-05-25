import "./style.less";

import { useRequest } from "ahooks";
import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

import { api } from "../../api";
import { formatMoneyWithCurrency, makePluralForm } from "../../helpers/utils";
import PrizeIcon from "../../images/first-prize-icon.svg";
import GoBack from "../../images/go-back.svg";
import IconCrown from "../../images/icon-crown.svg";
import { Error } from "../error";
import { Footer } from "../footer";
import { Loading } from "../loading";

const Prizes = () => {
  const getPrizes = () => {
    return api.get(`/competitions/competition_prizes`);
  };

  const { data, error, loading } = useRequest(getPrizes, {
    formatResult: (res) => res.data,
  });

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Loading />;
  }

  const calculateTotalMoneyPrize = () => {
    const totalMoney = data.moneyPrizes.reduce(
      (accumulator, currentValue) => accumulator + currentValue.prize,
      0
    );
    return formatMoneyWithCurrency(totalMoney, data.moneyPrizes[0].currency);
  };

  return (
    <>
      <div className="prizes">
        <Link to="/competition-info" className="go-back">
          <GoBack />
        </Link>
        <div className="prizes__wrapper">
          <h1 className="headline--small prizes__title">Prizes</h1>
          <div className="prizes__main-prize text-pink">
            {calculateTotalMoneyPrize()}
          </div>

          <div className="prizes__top-places top-places">
            {data.moneyPrizes.slice(0, 3).map((moneyPrize) => {
              const topPlaceClass = classNames("top-places__item text-grey", {
                "top-places__item--first": moneyPrize.place === 1,
                "top-places__item--second": moneyPrize.place === 2,
              });

              const topImageClass = classNames("top-places__img", {
                "top-places__img--big": moneyPrize.place === 1,
              });

              return (
                <div className={topPlaceClass} key={moneyPrize.place}>
                  <div className="top-places__number">
                    {moneyPrize.place === 1 ? (
                      <IconCrown className="top-places__crown" />
                    ) : (
                      moneyPrize.place
                    )}
                  </div>
                  <div className={topImageClass}>
                    <PrizeIcon />
                  </div>
                  <div className="top-places__money">
                    {formatMoneyWithCurrency(
                      moneyPrize.prize,
                      moneyPrize.currency
                    )}
                  </div>
                  <div className="top-places__spins text-tiny text-pink">
                    {data.notMoneyPrizes[moneyPrize.place - 1].prize}{" "}
                    {makePluralForm("spin", moneyPrize.prize)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="prizes__other-places other-places">
          {data.notMoneyPrizes.slice(3).map((prize) => (
            <div className="other-places__item text-grey" key={prize.range[0]}>
              <div className="other-places__number">
                {prize.range[0]}{" "}
                {prize.range[0] !== prize.range[1] && `- ${prize.range[1] + 1}`}
              </div>
              <div className="other-places__money">
                {prize.prize} {makePluralForm("spin", prize.prize)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer active="levels" />
    </>
  );
};

export default Prizes;
