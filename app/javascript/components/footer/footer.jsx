import "./style.less";

import propTypes from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ChildContext from "../../helpers/child-context";
import IconButton from "../../images/button.svg";
import IconLeaderboard from "../../images/icon-leaderboard.svg";
import IconLevels from "../../images/icon-levels.svg";
import IconProfile from "../../images/icon-profile.svg";
import IconSpinner from "../../images/icon-spinner.svg";

const Footer = ({ isEnterButtonSmall, active }) => {
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
      <Link
        to="/sign-up"
        className={`footer__button ${
          isEnterButtonSmall && "footer__button--small"
        }`}
      >
        <IconButton />
      </Link>
    );
  };

  return (
    <div className="footer">
      <Link to="/" className="footer__item">
        <IconLeaderboard
          className={`svg-beige ${active === "leaderboard" && "svg-pink"}`}
        />
        <div className="footer__item__title">Leaderboard</div>
      </Link>

      <Link to="/spinner" className="footer__item">
        <IconSpinner
          className={`svg-beige ${active === "spinner" && "svg-pink"}`}
        />
        <div className="footer__item__title">Spinner</div>
      </Link>

      {renderCentralButton(currentChild)}

      <Link to="/level" className="footer__item">
        <IconLevels
          className={`svg-beige ${active === "levels" && "svg-pink"}`}
        />
        <div className="footer__item__title">Levels</div>
      </Link>

      <Link to="/profile" className="footer__item">
        <IconProfile
          className={`svg-beige ${active === "profile" && "svg-pink"}`}
        />
        <div className="footer__item__title">Profile</div>
      </Link>
    </div>
  );
};

Footer.propTypes = {
  isEnterButtonSmall: propTypes.bool,
  active: propTypes.string,
};

export default Footer;
