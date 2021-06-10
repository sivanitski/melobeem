import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useContext } from "react";
import { Redirect, useHistory, withRouter } from "react-router";
import { Link } from "react-router-dom";

import { api } from "../../../api";
import ChildContext from "../../../helpers/child-context";
import GoBack from "../../../images/go-back.svg";
import Loader from "../../animation/loader";
import { Error } from "../../error";
import { Footer } from "../../footer";

const EditEntry = ({
  match: {
    params: { id },
  },
}) => {
  const { currentChild } = useContext(ChildContext);
  const history = useHistory();

  const getChild = () => {
    return api.get(`/entries/${id}`);
  };

  const { data: child, error, loading } = useRequest(getChild, {
    formatResult: (res) => res.data.entry,
  });

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Loader />;
  }

  if (currentChild?.id !== child.id || !child.currentCompetition) {
    return <Redirect to={`/entry/${id}`} />;
  }

  const handleEditPhoto = () => {
    if (child.totalVotes > 0) {
      return;
    }

    history.push("/sign-up", { id, step: 2 });
  };

  const handleEditName = async () => {
    history.push("/sign-up", { id, step: 1 });
  };

  return (
    <>
      <div className="edit-entry">
        <Link to={`/entry/${child.id}`} className="go-back">
          <GoBack />
        </Link>

        <div className="edit-entry__img">
          <img src={child.imageUrl} />
        </div>
        <div className="edit-entry__name headline--medium">{child.name}</div>
        <div className="edit-entry__text text-grey">
          {child.totalVotes > 0
            ? "Photo can be changed before first vote. If you have one or more vote you you need to delete your entry and enter again with new picture."
            : "If you dont have any votes yet, you can change the photo. If you already have votes, updating the photo is locked."}
        </div>

        <div className="edit-entry__buttons">
          <button
            className={`button edit-entry__button ${
              child.totalVotes > 0 && "form__button--disabled"
            }`}
            type="button"
            onClick={handleEditPhoto}
          >
            Change photo
          </button>

          <button
            className="button edit-entry__button"
            type="button"
            onClick={handleEditName}
          >
            Change name
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

EditEntry.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }),
};

export default withRouter(EditEntry);
