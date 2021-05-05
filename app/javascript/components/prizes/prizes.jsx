import "./style.less";

import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

import PrizeIcon from "../../images/first-prize-icon.svg";
import GoBack from "../../images/go-back.svg";
import IconCrown from "../../images/icon-crown.svg";
import { Footer } from "../footer";

const Prizes = () => {
  const MOCK_PRIZES = [
    { place: "1", benefit: "3000" },
    { place: "2", benefit: "200" },
    { place: "3", benefit: "100" },
    { place: "4", benefit: "Xxxx + Xxxx" },
    { place: "5", benefit: "Xxxx + Xxxx" },
    { place: "6 - 20", benefit: "Xxxx + Xxxx" },
    { place: "20 - 40", benefit: "Xxxx + Xxxx" },
    { place: "40-100", benefit: "Xxxx + Xxxx" },
  ];

  return (
    <>
      <div className="prizes">
        <Link to="/competition-info" className="go-back">
          <GoBack />
        </Link>
        <div className="prizes__wrapper">
          <h1 className="headline--small prizes__title">Prizes</h1>
          <div className="prizes__main-prize text-pink">£ 3,000.56</div>

          <div className="prizes__top-places top-places">
            {MOCK_PRIZES.slice(0, 3).map((prize) => {
              const topPlaceClass = classNames("top-places__item text-grey", {
                "top-places__item--first": prize.place === "1",
                "top-places__item--second": prize.place === "2",
              });

              const topImageClass = classNames("top-places__img", {
                "top-places__img--big": prize.place === "1",
              });

              return (
                <div className={topPlaceClass} key={prize.place}>
                  <div className="top-places__number">
                    {prize.place === "1" ? (
                      <IconCrown className="top-places__crown" />
                    ) : (
                      prize.place
                    )}
                  </div>
                  <div className={topImageClass}>
                    <PrizeIcon />
                  </div>
                  <div className="top-places__money">£ {prize.benefit}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="prizes__other-places other-places">
          {MOCK_PRIZES.slice(3).map((prize) => (
            <div className="other-places__item text-grey" key={prize.place}>
              <div className="other-places__number">{prize.place}</div>
              <div className="other-places__money">£ {prize.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Prizes;
