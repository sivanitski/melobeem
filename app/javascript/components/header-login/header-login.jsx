import "./style.less";

import propTypes from "prop-types";
import React from "react";

import { formatTimeDayAndMonth } from "../../helpers/date";
import LogoText from "../../images/logo-text.svg";

const HeaderLogin = ({ endsAt, createdAt }) => {
  return (
    <div className="header-login">
      <div className="header-login__logo">
        <LogoText />
      </div>
      <div className="header-login__text text-grey text-small">
        Competition from {formatTimeDayAndMonth(createdAt)} to{" "}
        {formatTimeDayAndMonth(endsAt)}
      </div>
    </div>
  );
};

HeaderLogin.propTypes = {
  endsAt: propTypes.string.isRequired,
  createdAt: propTypes.string.isRequired,
};

export default HeaderLogin;
