import "./style.less";

import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ChildContext from "../../helpers/child-context";
import IconButton from "../../images/button.svg";
import IconLeaderboard from "../../images/icon-leaderboard.svg";
import IconLevels from "../../images/icon-levels.svg";
import IconProfile from "../../images/icon-profile.svg";
import IconSpinner from "../../images/icon-spinner.svg";

const Footer = () => {
  const { currentChild } = useContext(ChildContext);

  const renderCentralButton = (child) => {
    if (child) {
      return (
        <Link to={`/entry/${child.id}`} className="footer__button">
          <img src={child.imageUrl} />
        </Link>
      );
    }

    return (
      <Link to="/sign-up" className="footer__button">
        <IconButton />
      </Link>
    );
  };

  return (
    <div className="footer">
      <Link to="/" className="footer__item">
        <IconLeaderboard />
        <div className="footer__item__title">Leaderboard</div>
      </Link>

      <a className="footer__item">
        <IconSpinner />
        <div className="footer__item__title">Spinner</div>
      </a>

      {renderCentralButton(currentChild)}

      <Link to="/level" className="footer__item">
        <IconLevels />
        <div className="footer__item__title">Levels</div>
      </Link>

      <Link to="/profile" className="footer__item">
        <IconProfile />
        <div className="footer__item__title">Profile</div>
      </Link>
    </div>
  );
};

export default Footer;
