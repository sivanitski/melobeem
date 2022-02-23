import propTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router";

import GoBack from "../../images/go-back.svg";

const BackButton = ({ history }) => {
  return (
    <button type="button" onClick={() => history.goBack()} className="go-back">
      <GoBack />
    </button>
  );
};

BackButton.propTypes = {
  history: propTypes.shape({
    goBack: propTypes.func.isRequired,
  }),
};

export default withRouter(BackButton);
