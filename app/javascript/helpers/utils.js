import currency from "currency.js";

export const filterCompetitors = (childName, children) => {
  return children.filter((child) =>
    child.name.toLowerCase().includes(childName.toLowerCase())
  );
};

export const getLoginPayload = (data) => {
  const parts = data.tokenDetail.signedRequest.split(".");
  const payloadString = window.atob(parts[1]);
  const payload = JSON.parse(payloadString);
  return payload;
};

export const getSiteBaseUrl = () => window.location.origin;

export const makeFirstLetterUppercase = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const makePluralForm = (string, condition) => {
  if (condition > 1) {
    return string + "s";
  }

  return string;
};

export const formatMoneyWithCurrency = (
  prize,
  currencyValue,
  fromCents = true
) => {
  return currency(prize, {
    fromCents,
    precision: 2,
    pattern: `!#`,
    symbol: currencyValue,
    separator: ",",
  }).format();
};
