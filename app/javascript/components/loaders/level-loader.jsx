import React from "react";
import ContentLoader from "react-content-loader";

const LevelLoader = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={450}
    viewBox="0 0 375 450"
    backgroundColor="#ffeef2"
    foregroundColor="#ff9eb5"
  >
    <circle cx="190" cy="76" r="73" />
    <rect x="133" y="161" rx="6" ry="6" width="119" height="38" />
    <rect x="129" y="211" rx="6" ry="6" width="128" height="86" />
    <rect x="139" y="311" rx="20" ry="20" width="107" height="40" />
  </ContentLoader>
);

export default LevelLoader;
