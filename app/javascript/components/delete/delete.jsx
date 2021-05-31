import "./style.less";

import propTypes from "prop-types";
import React, { useContext } from "react";
import { useHistory, withRouter } from "react-router";

import { api } from "../../api";
import ChildContext from "../../helpers/child-context";
import deleteSnailIcon from "../../images/snail.png";
import { Footer } from "../footer";

const Delete = ({ location: { state } }) => {
  const { currentChild, setCurrentChild } = useContext(ChildContext);
  const history = useHistory();
  const DELETE_TITLE = {
    child: "Delete my entry",
    user: "Delete my Account",
  };

  const DELETE_TEXT = {
    child:
      "All votes will be deleted with no refund. Think about it! Are you sure you want to leave?",
    user:
      "This action is final and it will be not possible to reactivate after deletion.",
  };

  const handleKeepClick = () => {
    if (state.type === "child") {
      history.push(`entry/${state.id}`);
    } else {
      history.push(`/profile/${state.id}`);
    }
  };

  const handleDelete = async () => {
    if (state.type !== "child") {
      history.push("/delete/confirm", { id: state.id });
      return;
    }

    const res = await api.delete(`/users/entries/${state.id}`);
    if (!res) {
      return;
    }

    if (currentChild.id === state.id) {
      setCurrentChild(null);
    }
    history.push("/sign-up");
  };

  if (!state) {
    history.push("/");
  }

  return (
    <>
      <div className="delete">
        <div className="delete__title headline--medium">
          {DELETE_TITLE[state.type]}
        </div>
        <div className="delete__text"> {DELETE_TEXT[state.type]}</div>

        <div className="delete__snail__icon">
          <img src={deleteSnailIcon} />
        </div>
        <div className="delete__buttons">
          <button
            className="delete__button delete__button--reject"
            type="button"
            onClick={handleKeepClick}
          >
            Keep my {state.type === "child" ? "entry" : "account"}
          </button>

          <button
            className="delete__button delete__button--confirm"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

Delete.propTypes = {
  location: propTypes.shape({
    state: propTypes.shape({
      id: propTypes.number,
      type: propTypes.string,
    }),
  }),
};

export default withRouter(Delete);
