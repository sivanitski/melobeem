import React from "react";
import ContentLoader from "react-content-loader";

const VoteListLoader = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={400}
    viewBox="0 0 450 400"
    backgroundColor="#ffeef2"
    foregroundColor="#ff9eb5"
  >
    <rect x="23" y="12" rx="20" ry="20" width="400" height="112" />
    <rect x="23" y="144" rx="20" ry="20" width="400" height="112" />
    <rect x="23" y="278" rx="20" ry="20" width="400" height="112" />
  </ContentLoader>
);

export default VoteListLoader;
