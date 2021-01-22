import "./style.less";

import React from "react";

import IconButton from "../../images/button.svg";
import IconLeaderboard from "../../images/icon-leaderboard.svg";
import IconLevels from "../../images/icon-levels.svg";
import IconProfile from "../../images/icon-profile.svg";
import IconSpinner from "../../images/icon-spinner.svg";

const Footer = () => {
  return (
    <div className="footer">
      <a className="footer__item">
        <IconLeaderboard />
        <div className="footer__item__title">Leaderboard</div>
      </a>
      <a className="footer__item">
        <IconSpinner />
        <div className="footer__item__title">Spinner</div>
      </a>
      <a className="footer__button">
        <IconButton />
      </a>
      <a className="footer__item">
        <IconLevels />
        <div className="footer__item__title">Levels</div>
      </a>
      <a className="footer__item">
        <IconProfile />
        <div className="footer__item__title">Profile</div>
      </a>
    </div>
  );
};

export default Footer;
