import "./style.less";

import React from "react";
import { Link } from "react-router-dom";

import headerLeft from "../../images/header-left.png";
import headerLeft2x from "../../images/header-left@2x.png";
import headerRight from "../../images/header-right.png";
import headerRight2x from "../../images/header-right@2x.png";
import LogoIcon from "../../images/logo-icon.svg";
import LogoText from "../../images/logo-text.svg";
import { FacebookLoginComponent } from "../facebook-login";

const HeaderNotLogin = () => {
  return (
    <div className="header-not-login">
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
          Melobeem is a free photo contest for Babies up to 4 years!
          <br /> Enter and vote to win prizes each month!
        </div>
      </div>
      <div className="header-not-login__buttons">
        <Link to="/sign-up" className="button header-not-login__button">
          Enter competition
        </Link>

        <FacebookLoginComponent
          title="Login with Facebook"
          state={"login"}
          classes="header-not-login__button"
        />
      </div>
    </div>
  );
};

export default HeaderNotLogin;
