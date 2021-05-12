import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const VoteButton = ({ id }) => {
  return (
    <Link to={`/entry/${id}/vote`} className="button entry__button">
      Vote
    </Link>
  );
};

VoteButton.propTypes = {
  id: propTypes.number.isRequired,
};

export default VoteButton;
