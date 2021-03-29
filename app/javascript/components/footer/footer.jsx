import "./style.less";

import { useRequest } from "ahooks";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { createAPI } from "../../api";
import ChildContext from "../../helpers/child-context";
import UserContext from "../../helpers/user-context";
import IconButton from "../../images/button.svg";
import IconLeaderboard from "../../images/icon-leaderboard.svg";
import IconLevels from "../../images/icon-levels.svg";
import IconProfile from "../../images/icon-profile.svg";
import IconSpinner from "../../images/icon-spinner.svg";

const Footer = () => {
  const api = createAPI();
  const { user } = useContext(UserContext);
  const { currentChild, setCurrentChild } = useContext(ChildContext);

  const getCurrentChildren = () => {
    return api.get("/entries/current");
  };

  const {
    data: currentChildData,
    run: requestCurrentChild,
    loading: childLoading,
  } = useRequest(getCurrentChildren, {
    formatResult: (res) => res.data.entry,
    throwOnError: true,
  });

  useEffect(() => {
    if (user && !currentChild) {
      requestCurrentChild();
    }

    if (currentChildData) {
      setCurrentChild(currentChildData);
    }
  }, [user, currentChildData]);

  const renderCentralButton = (child) => {
    if (childLoading) {
      return (
        <div className="footer__button">
          <IconButton />
        </div>
      );
    }

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
      <a className="footer__item">
        <IconLevels />
        <div className="footer__item__title">Levels</div>
      </a>
      <Link to="/profile" className="footer__item">
        <IconProfile />
        <div className="footer__item__title">Profile</div>
      </Link>
    </div>
  );
};

export default Footer;
