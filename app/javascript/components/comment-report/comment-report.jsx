import "./style.less";

import propTypes from "prop-types";
import React, { useContext, useEffect, useRef, useState } from "react";
import { withRouter } from "react-router";
import TextareaAutosize from "react-textarea-autosize";

import { api } from "../../api";
import ChildContext from "../../helpers/child-context";
import ModalHeader from "../../images/modal_header.svg";
import Snail from "../../images/snail.svg";
import { Footer } from "../footer";
import Modal from "./modal/Modal";

const CommentReport = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const { currentChild } = useContext(ChildContext);
  const [types, setTypes] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState(-1);
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(true);
  const descriptionRef = useRef(null);

  useEffect(() => {
    async function getTypes() {
      const { data } = await api.get("/users_reports/list_of_types");
      setTypes(data);
    }
    getTypes();
  }, []);

  useEffect(() => {
    if (selectedTypeId !== -1) {
      descriptionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTypeId]);

  const handleSelectType = (selectedId) => {
    if (selectedId !== selectedTypeId) setSelectedTypeId(selectedId);
    else {
      setSelectedTypeId(-1);
      setDescription("");
      setIsValid(true);
    }
  };

  const handleDescription = (newValue) => {
    setDescription(newValue);
    if (newValue != "") setIsValid(true);
  };

  const handleSubmit = () => {
    if (description == "") {
      setIsValid(false);
      return;
    } else {
      setIsValid(true);
    }
    api
      .post("/users_reports", {
        users_report: {
          target_id: id,
          target_type: "Comment",
          report_type: selectedTypeId,
          details: description,
        },
      })
      .catch((error) => {
        console.error(error.response.data.message);
        setShow(true);
        setErrorMessage(error.response.data.message);
      })
      .then((res) => {
        if (res) {
          setShow(true);
          setSelectedTypeId(-1);
          setDescription("");
        }
      });
  };

  const handleModal = () => {
    setShow(false);
    history.goBack();
  };

  return (
    <>
      <div className="title_section">
        <h1>Report</h1>
      </div>
      <div className="subtitle_section">
        <span className="subtitle_content">
          Why are you reporting this post?
        </span>
      </div>
      <div className="image_section">
        <Snail />
      </div>
      <div className="report_setion">
        <div className="type_list_section">
          {types &&
            types.map((type, index) => (
              <button
                key={index}
                className={`type_button ${
                  selectedTypeId === type.id ? "active" : ""
                }`}
                onClick={() => handleSelectType(type.id)}
              >
                {type.text}
              </button>
            ))}
        </div>
        {selectedTypeId !== -1 ? (
          <div ref={descriptionRef} className="report_content">
            <div className="report_description">
              <span className="description_label">
                Please explain in detail
              </span>
              <TextareaAutosize
                className={`description_input ${!isValid ? "is_valid" : ""}`}
                onChange={(e) => handleDescription(e.target.value)}
                autoFocus
              />
            </div>
            <button
              className={`send_button ${description !== "" ? "active" : ""}`}
              onClick={() => handleSubmit()}
            >
              Send
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <Footer />
      <Modal show={show} onClose={() => handleModal()}>
        <div className="modal_content">
          <div className="modal_header">
            <ModalHeader />
            {currentChild && (
              <img
                className="modal_avatar"
                src={currentChild.imageUrl}
                alt={currentChild.name}
              />
            )}
          </div>
          {errorMessage == "" ? (
            <>
              <h1 className="modal_title">Thank you</h1>
              <span className="modal_description">
                for letting us know. <br /> Your feedback is important in
                helping us keep the Melobeem community safe.
              </span>
            </>
          ) : (
            <span className="modal_description">{errorMessage}</span>
          )}
        </div>
      </Modal>
    </>
  );
};

CommentReport.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }),
  history: propTypes.shape({
    action: propTypes.string.isRequired,
    goBack: propTypes.func.isRequired,
  }),
};

export default withRouter(CommentReport);
