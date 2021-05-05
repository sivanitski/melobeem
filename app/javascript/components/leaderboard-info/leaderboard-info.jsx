import "./style.less";

import React from "react";
import { Link } from "react-router-dom";

import RightArrow from "../../images/arrow-right.svg";
import GoBack from "../../images/go-back.svg";
import IconCrown from "../../images/icon-crown.svg";
import IconGift from "../../images/icon-gift.svg";
import LogoText from "../../images/logo-text.svg";
import { Footer } from "../footer";

const PAGES = {
  WINNERS: {
    NAME: "Previous winners",
    LINK: "/competition-info/winners",
    IMG: IconCrown,
  },
  PRIZES: { NAME: "Prizes", LINK: "/competition-info/prizes", IMG: IconGift },
};

const LeaderboardInfo = () => {
  return (
    <>
      <div className="leaderboard-info">
        <div className="leaderboard-info__wrapper">
          <div className="leaderboard-info__logo">
            <LogoText />
          </div>
          <Link to="/" className="go-back">
            <GoBack />
          </Link>
          {Object.keys(PAGES).map((pageNameKey) => (
            <Link
              className="leaderboard-info__item"
              key={pageNameKey}
              to={PAGES[pageNameKey].LINK}
            >
              {pageNameKey === "WINNERS" ? (
                <IconCrown className="leaderboard-info__img leaderboard-info__img--crown" />
              ) : (
                <IconGift className="leaderboard-info__img" />
              )}
              <span className="text-grey">{PAGES[pageNameKey].NAME}</span>
              <RightArrow className="leaderboard-info__right-arrow" />
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LeaderboardInfo;
