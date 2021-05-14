import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const SignUpDouble = ({ imagePreviewUrl, childId }) => {
  return (
    <div className="form-share">
      <div className="form-share__img">
        <img src={imagePreviewUrl} />
      </div>
      <div className="form-share__title headline--medium">
        You already have an entry
      </div>
      <div className="form-share__text text-grey">
        You are allowed one entry per competition. You will need to delete your
        current entry to be able to enter a new one.
      </div>

      <Link to={`/entry/${childId}`} className="button form__button">
        Go to my Entry
      </Link>
    </div>
  );
};

SignUpDouble.propTypes = {
  imagePreviewUrl: propTypes.string.isRequired,
  childId: propTypes.number.isRequired,
};

export default SignUpDouble;
