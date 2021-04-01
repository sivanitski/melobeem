export const filterCompetitors = (childName, children) => {
  return children.filter((child) =>
    child.name.toLowerCase().includes(childName.toLowerCase())
  );
};

export const roundToHundredths = (number) => Math.round(number * 100) / 100;

export const getLoginPayload = (data) => {
  const parts = data.tokenDetail.signedRequest.split(".");
  const payloadString = window.atob(parts[1]);
  const payload = JSON.parse(payloadString);
  return payload;
};

export const getSiteBaseUrl = () => window.location.origin;
