import React from "react";
import ContentLoader from "react-content-loader";

const EntryShowLoader = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={620}
    viewBox="0 0 375 620"
    backgroundColor="#ffeef2"
    foregroundColor="#ff9eb5"
  >
    <rect x="26" y="30" rx="6" ry="6" width="69" height="43" />
    <rect x="0" y="97" rx="6" ry="6" width="376" height="298" />
    <rect x="77" y="461" rx="20" ry="20" width="210" height="48" />
    <rect x="279" y="30" rx="6" ry="6" width="69" height="43" />
    <rect x="99" y="415" rx="6" ry="6" width="163" height="31" />
    <circle cx="44" cy="573" r="36" />
    <rect x="97" y="554" rx="6" ry="6" width="214" height="29" />
    <rect x="142" y="9" rx="6" ry="6" width="90" height="14" />
  </ContentLoader>
);

export default EntryShowLoader;
