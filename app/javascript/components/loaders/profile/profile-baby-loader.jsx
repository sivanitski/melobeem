import React from "react";
import ContentLoader from "react-content-loader";

const ProfileBabyLoader = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={300}
    viewBox="0 0 375 300"
    backgroundColor="#ffeef2"
    foregroundColor="#ff9eb5"
  >
    <rect x="7" y="18" rx="35" ry="35" width="173" height="215" />
    <rect x="198" y="18" rx="35" ry="35" width="173" height="215" />
  </ContentLoader>
);

export default ProfileBabyLoader;
