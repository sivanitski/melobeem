import propTypes from "prop-types";
import React from "react";
import { ShareButton } from "react-facebook";

import { getSiteBaseUrl } from "../../helpers/utils";

const FacebookShare = ({ children, classes, childId }) => {
  const siteBaseUrl = getSiteBaseUrl();

  return (
    <ShareButton href={`${siteBaseUrl}/entry/${childId}`} className={classes}>
      {children}
    </ShareButton>
  );
};

FacebookShare.propTypes = {
  children: propTypes.oneOfType([propTypes.string, propTypes.object])
    .isRequired,
  classes: propTypes.string.isRequired,
  childId: propTypes.number.isRequired,
};

export default FacebookShare;
