import "./style.less";

import propTypes from "prop-types";
import React from "react";

import ButtonClose from "../../images/close-icon.svg";

const InfoBlock = ({ title, text, handleInfoClose }) => {
  return (
    <div className="info">
      <div className="info__close" onClick={handleInfoClose}>
        <ButtonClose />
      </div>
      <div className="info__title">{title}</div>
      <div className="info__text">{text}</div>
    </div>
  );
};

InfoBlock.propTypes = {
  handleInfoClose: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
};

export default InfoBlock;
