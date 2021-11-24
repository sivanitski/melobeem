import "./style.less";

import propTypes from "prop-types";
import React from "react";

import ButtonClose from "../../images/close-icon.svg";
import PopupButton from "./blocks/popup-button";
import PopupImage from "./blocks/popup-image";
import PopupText from "./blocks/popup-text";
import PopupTitle from "./blocks/popup-title";

const Popup = ({ handlePopupClose, linkId, name, image, type, parentName }) => {
  return (
    <div className="popup">
      <div className="popup__inner">
        <div className="popup__close" onClick={handlePopupClose}>
          <ButtonClose />
        </div>
        <div className={`popup__avatar ${type}`}>
          <PopupImage type={type} image={image} />
        </div>
        <PopupTitle type={type} />
        <PopupText type={type} name={name} parentName={parentName} />
        <PopupButton type={type} linkId={linkId} />
      </div>
    </div>
  );
};

Popup.propTypes = {
  handlePopupClose: propTypes.func.isRequired,
  linkId: propTypes.number,
  name: propTypes.string,
  image: propTypes.string,
  type: propTypes.string.isRequired,
  parentName: propTypes.string,
};

export default Popup;
