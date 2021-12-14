import propTypes from "prop-types";
import React, { useEffect, useRef } from "react";

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
        <div style={modalStyle} className="thanks_modal">
          {children}
          <button className="close_btn active" onClick={onClose}>
            Back
          </button>
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
