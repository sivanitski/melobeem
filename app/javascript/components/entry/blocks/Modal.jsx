import propTypes from "prop-types";
import React, { useEffect, useRef } from "react";

import ButtonClose from "../../../images/close-icon.svg";

const Modal = ({ modalStyle, children, show, onClose, backdropStyle }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (show) {
      modalRef.current.classList.add("visible");
    } else {
      modalRef.current.classList.remove("visible");
    }
  }, [show]);
  return (
    <React.Fragment>
      <div ref={modalRef} style={backdropStyle} className="modal__wrap">
        <div style={modalStyle} className="modal">
          {children}
          <ButtonClose
            height="20px"
            width="20px"
            className="close_icon"
            onClick={onClose}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

Modal.propTypes = {
  onClose: propTypes.func.isRequired,
  show: propTypes.bool.isRequired,
  children: propTypes.object.isRequired,
  modalStyle: propTypes.string,
  backdropStyle: propTypes.string,
};

export default Modal;
