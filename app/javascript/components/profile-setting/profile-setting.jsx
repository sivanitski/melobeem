import "./style.less";

import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { createAPI } from "../../api";
import ChildContext from "../../helpers/child-context";
import UserContext from "../../helpers/user-context";
import RightArrow from "../../images/arrow-right.svg";
import imageAvatar from "../../images/avatar.png";
import GoBack from "../../images/go-back.svg";
import { Footer } from "../footer";

const ProfileSetting = () => {
  const { user, setUser } = useContext(UserContext);
  const { setCurrentChild } = useContext(ChildContext);
  const api = createAPI();

  const getCookie = (name) => {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    }

  const clearContext = () => {
    const fbCookie = getCookie('fbsr_2495138454127282');
    document.cookie = `fbsr_2495138454127282=${fbCookie}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    setUser(null);
    setCurrentChild(null);
  };

  const handleLogout = async () => {
    await axios.delete("/users/sign_out");
    FB.getLoginStatus(function(response) {
      if (response && response.status === 'connected') {
        FB.logout();
      }
    });
    clearContext();
  };

  const handleDelete = async () => {
    // Here firstly will be alert confirmation on the next task and after api call for deleting
    await api.delete(`/users/${user.id}/deactivate`);
    clearContext();
  };

  const PAGES = {
    RULES: { NAME: "Rules", LINK: "" },
    PRICACY: { NAME: "Privacy", LINK: "" },
    TERMS: { NAME: "Terms & Conditions", LINK: "" },
    HELP: { NAME: "Help", LINK: "" },
  };

  const DELETE_OPTIONS = {
    DELETE_USER: { NAME: "Delete my account", HANDLE_CLICK: handleDelete },
    LOGOUT: { NAME: "Log out", HANDLE_CLICK: handleLogout },
  };

  return (
    <>
      <div className="setting">
        <h1 className="headline--small setting__title">Settings</h1>

        <Link to="/profile" className="go-back">
          <GoBack />
        </Link>

        <Link to="/profile" className="setting__user">
          <div className="setting__avatar">
            <img src={user.avatarUrl || imageAvatar} />
          </div>
          <div className="setting__name text-black headline">{user.name}</div>
          <RightArrow className="setting__right-arrow" />
        </Link>

        <ul className="setting__list">
          {Object.keys(PAGES).map((pageNameKey) => (
            <Link
              className="setting__item"
              key={pageNameKey}
              to={PAGES[pageNameKey].LINK}
            >
              <span className="text-grey">{PAGES[pageNameKey].NAME}</span>
              <RightArrow className="setting__right-arrow" />
            </Link>
          ))}
        </ul>

        <ul className="setting__list">
          {Object.keys(DELETE_OPTIONS).map((deleteOption) => (
            <li
              key={deleteOption}
              className="setting__item"
              onClick={DELETE_OPTIONS[deleteOption].HANDLE_CLICK}
            >
              <span className="text-grey">
                {DELETE_OPTIONS[deleteOption].NAME}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default ProfileSetting;
