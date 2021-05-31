import propTypes from "prop-types";
import React, { useContext, useState } from "react";
import { useHistory, withRouter } from "react-router";

import { api } from "../../../api";
import ChildContext from "../../../helpers/child-context";
import UserContext from "../../../helpers/user-context";
import { Footer } from "../../footer";

const DeleteConfirm = ({ location: { state } }) => {
  const { setUser } = useContext(UserContext);
  const { currentChild, setCurrentChild } = useContext(ChildContext);
  const history = useHistory();
  const [inputValue, setInputValue] = useState("");
  const [isDeleteButton, setIsDeleteButton] = useState(false);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setInputValue(value.toLowerCase());

    if (value.length > 5) {
      setIsDeleteButton(true);
    } else {
      setIsDeleteButton(false);
    }
  };

  const handleKeepClick = () => {
    history.push(`/profile/${state.id}`);
  };

  const handleDelete = async () => {
    if (inputValue !== "delete") {
      return;
    }

    const res = await api.delete(`users/${state.id}/deactivate`);
    if (!res) {
      return;
    }

    if (currentChild) {
      setCurrentChild(null);
    }
    setUser(null);
    history.push("/");
  };

  if (!state) {
    history.push("/");
  }

  return (
    <>
      <div className="delete">
        <div className="delete__title headline--medium">I realized that</div>
        <div className="delete__text delete__text--long">
          all my participation in the competition will be canceled and my photo
          will be deleted.
        </div>
        <div className="delete__text delete__text--long">
          Please type “DELETE” to confirm your choice
        </div>

        <input
          minLength="2"
          name="name"
          value={inputValue}
          onChange={handleChange}
          id="delete-user"
          className="form__input delete__input"
          type="text"
        />

        <div className="delete__buttons delete__buttons--bottom">
          {isDeleteButton && (
            <button
              className="delete__button delete__button--deactivate"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}

          <button
            className="delete__button delete__button--reject"
            type="button"
            onClick={handleKeepClick}
          >
            Cancel
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

DeleteConfirm.propTypes = {
  location: propTypes.shape({
    state: propTypes.shape({
      id: propTypes.number,
    }),
  }),
};

export default withRouter(DeleteConfirm);
