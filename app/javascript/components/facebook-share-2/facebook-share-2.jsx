import propTypes from "prop-types";
import React from "react";

import { getSiteBaseUrl } from "../../helpers/utils";

const FacebookShare2 = ({ children, classes, childId, childImg }) => {
  const siteBaseUrl = getSiteBaseUrl();

  const encodedURL = `${siteBaseUrl}/entry/${childId}`;

  return (
    <a
      className={classes}
      href={`https://facebook.com/sharer/sharer.php?u=${encodedURL}?imageURL=${childImg}`}
    >
      {children}
    </a>
  );
};

FacebookShare2.propTypes = {
  children: propTypes.oneOfType([propTypes.string, propTypes.object])
    .isRequired,
  classes: propTypes.string.isRequired,
  childId: propTypes.number.isRequired,
  childImg: propTypes.string.isRequired,
};

export default FacebookShare2;
