import "./style.less";

import React, { useContext, useEffect, useState } from "react";
import { FacebookContext, LoginButton } from "react-facebook";

import { createFbAPI } from "../../api";
import headerLeft from "../../images/header-left.png";
import headerLeft2x from "../../images/header-left@2x.png";
import headerRight from "../../images/header-right.png";
import headerRight2x from "../../images/header-right@2x.png";
import LogoIcon from "../../images/logo-icon.svg";
import LogoText from "../../images/logo-text.svg";

const HeaderNotLogin = () => {
  const facebookContext = useContext(FacebookContext);
  const [appId, setAppId] = useState("");
  useEffect(() => {
    if (facebookContext.isReady) {
      setAppId(facebookContext.api.options.appId);
    }
  }, [facebookContext.isReady]);

  const api = createFbAPI();

  const handleResponse = (data) => {
    // { cookie: true } for FB.init does not work. We'll have to set the required cookie manually
    document.cookie = `fbsr_${appId}=${data.tokenDetail.signedRequest}`;

    api.get(``).then((res) => {
      console.log(res);
    });
  };

  const handleError = (error) => {
    console.log(error);
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
          Vote, share with your friends <br /> complete the tasks, <br /> there
          is many ways to win
        </div>
      </div>
      <div className="header-not-login__buttons">
        <button type="button" className="button header-not-login__button">
          Enter competition
        </button>

        <LoginButton onCompleted={handleResponse} onError={handleError}>
          <span className="button button--facebook header-not-login__button">
            Login with Facebook
          </span>
        </LoginButton>
      </div>
    </div>
  );
};

export default HeaderNotLogin;
