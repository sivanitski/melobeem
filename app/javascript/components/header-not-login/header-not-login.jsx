import "./style.less";

import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import headerLeft from "../../images/header-left.png";
import headerLeft2x from "../../images/header-left@2x.png";
import headerRight from "../../images/header-right.png";
import headerRight2x from "../../images/header-right@2x.png";
import LogoIcon from "../../images/logo-icon.svg";
import LogoText from "../../images/logo-text.svg";
import { FacebookLogin } from "../facebook-login";

const HeaderNotLogin = ({ getCurrentEntry }) => {
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
          Think you have The Cutest Baby Photo? Enter Melobeem and have a chance
          <br /> to be the next big winner
        </div>
      </div>
      <div className="header-not-login__buttons">
        <Link to="/sign-up" className="button header-not-login__button">
          Enter competition
        </Link>

        <FacebookLogin
          getCurrentEntry={getCurrentEntry}
          title="Login with Facebook"
          classes="header-not-login__button"
        />
      </div>
    </div>
  );
};

HeaderNotLogin.propTypes = {
  getCurrentEntry: propTypes.func.isRequired,
};

export default HeaderNotLogin;
