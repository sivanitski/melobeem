import "./style.less";

import React from "react";
import { Link } from "react-router-dom";

import headerLeft from "../../images/header-left.png";
import headerLeft2x from "../../images/header-left@2x.png";
import headerRight from "../../images/header-right.png";
import headerRight2x from "../../images/header-right@2x.png";
import LogoIcon from "../../images/logo-icon.svg";
import LogoText from "../../images/logo-text.svg";

const HeaderNotLogin = () => {
  return (
    <div className="header-not-login">
      <Link to="/test-page">LINK TO TEST</Link>
      <div className="header-not-login__pictures">
        <div className="header-not-login__pictures-list__item">
          <img src={headerLeft} srcSet={`${headerLeft2x} 2x`} alt="Cute Baby" />
        </div>
        <div className="header-not-login__pictures-list__item">
          <img
            src={headerRight}
            srcSet={`${headerRight2x} 2x`}
            alt="Cute Baby"
          />
        </div>
      </div>
      <div className="header-not-login__wrapper">
        <div className="header-not-login__logo-icon">
          <LogoIcon />
        </div>
        <div className="header-not-login__logo-text">
          <LogoText />
        </div>
        <div className="header-not-login__text text-grey">
          Vote, share with your friends <br /> complete the tasks, <br /> there
          is many ways to win
        </div>
      </div>
      <div className="header-not-login__buttons">
        <button className="button header-not-login__button">
          Enter competition
        </button>
        <button className="button button--facebook header-not-login__button">
          Login with Facebook{" "}
        </button>
      </div>
    </div>
  );
};

export default HeaderNotLogin;
