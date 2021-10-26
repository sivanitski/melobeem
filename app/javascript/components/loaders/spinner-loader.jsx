import React from "react";
import ContentLoader from "react-content-loader";

const SpinnerLoader = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={400}
    viewBox="0 0 375 400"
    backgroundColor="#ffeef2"
    foregroundColor="#ff9eb5"
  >
    <circle cx="180" cy="241" r="149" />
    <rect x="94" y="26" rx="6" ry="6" width="178" height="38" />
  </ContentLoader>
);

export default SpinnerLoader;
