import "./style.less";

import propTypes from "prop-types";
import React from "react";

import ButtonClose from "../../../images/close-icon.svg";
import TestImage from "../../../images/header-left@2x.png";
import { FacebookShare } from "../../facebook-share";

const VotePopup = ({ handlePopupClose, childId }) => {
  return (
    <div className="popup">
      <div className="popup__inner">
        <div className="popup__close" onClick={handlePopupClose}>
          <ButtonClose />
        </div>
        <div className="popup__avatar">
          <img src={TestImage} />
        </div>
        <div className="popup__share headline">Share</div>
        <div className="popup__text text-grey">
          Every Facebook post <br /> may make Diana closer to <br /> the wining
          point
        </div>
        <FacebookShare childId={childId} classes="popup__button">
          Share on Facebook
        </FacebookShare>
      </div>
    </div>
  );
};

VotePopup.propTypes = {
  handlePopupClose: propTypes.func.isRequired,
  childId: propTypes.number.isRequired,
};

export default VotePopup;
