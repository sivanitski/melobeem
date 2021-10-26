import React from "react";
import ContentLoader from "react-content-loader";

const CompetitorsLoading = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={300}
    viewBox="0 0 375 300"
    backgroundColor="#ffeef2"
    foregroundColor="#ff9eb5"
  >
    <circle cx="41" cy="51" r="34" />
    <rect x="97" y="28" rx="5" ry="5" width="140" height="18" />
    <rect x="97" y="53" rx="5" ry="5" width="140" height="18" />
    <rect x="308" y="53" rx="5" ry="5" width="50" height="18" />
    <rect x="308" y="30" rx="5" ry="5" width="50" height="18" />
    <circle cx="41" cy="131" r="34" />
    <rect x="97" y="108" rx="5" ry="5" width="140" height="18" />
    <rect x="97" y="133" rx="5" ry="5" width="140" height="18" />
    <rect x="308" y="133" rx="5" ry="5" width="50" height="18" />
    <rect x="308" y="110" rx="5" ry="5" width="50" height="18" />
    <circle cx="41" cy="211" r="34" />
    <rect x="97" y="188" rx="5" ry="5" width="140" height="18" />
    <rect x="97" y="213" rx="5" ry="5" width="140" height="18" />
    <rect x="308" y="213" rx="5" ry="5" width="50" height="18" />
    <rect x="308" y="190" rx="5" ry="5" width="50" height="18" />
  </ContentLoader>
);

export default CompetitorsLoading;
