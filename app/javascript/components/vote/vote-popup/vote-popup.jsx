import "./style.less";

import propTypes from "prop-types";
import React from "react";

import ButtonClose from "../../../images/close-icon.svg";
import { FacebookShare } from "../../facebook-share";

const VotePopup = ({ handlePopupClose, childId, childName, childImage }) => {
  return (
    <div className="popup">
      <div className="popup__inner">
        <div className="popup__close" onClick={handlePopupClose}>
          <ButtonClose />
        </div>
        <div className="popup__avatar">
          <img src={childImage} />
        </div>
        <div className="popup__share headline">Share</div>
        <div className="popup__text text-grey">
          Sharing is the best way to get more love for your cute photo of{" "}
          {childName}
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
  childName: propTypes.string.isRequired,
  childImage: propTypes.string.isRequired,
};

export default VotePopup;
