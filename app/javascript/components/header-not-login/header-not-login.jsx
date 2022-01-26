import "./style.less";

import axios from "axios";
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
  const trackEvent = (event, eventName) => {
    let json = JSON.stringify({
      tk: "riuerunb3UIBBINIn2in23ibbYB@UYBBoi4oon12b124",
      event: {
        site: "melobeem",
        event: event,
        event_name: eventName,
        user_token: localStorage.getItem("tk"),
      },
    });

    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
    };

    fetch("http://localhost:3031/events", requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));
  };

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
          Melobeem is a free photo contest for Babies up to 4 years.
          <br /> Enter and vote to win prizes each month!
        </div>
      </div>
      <div className="header-not-login__buttons">
        <div onClick={() => trackEvent("click", "enter-competition")}>
          <Link
            to="/sign-up"
            id="enter_competition_from_leaderboard"
            className="button header-not-login__button"
          >
            Enter competition
          </Link>
        </div>

        <div onClick={() => trackEvent("click", "login-with-facebook")}>
          <FacebookLoginComponent
            title="Login with Facebook"
            state={"login"}
            classes="header-not-login__button"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderNotLogin;
