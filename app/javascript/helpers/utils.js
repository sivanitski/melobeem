import camelCase from "camelcase";

export const filterCompetitors = (childName, children) => {
  return children.filter((child) =>
    child.name.toLowerCase().includes(childName.toLowerCase())
  );
};

export const roundToHundredths = (number) => Math.round(number * 100) / 100;

export const makeArrayCamelCase = (array) => {
  return array.map((item) => {
    let object = {};
    Object.keys(item).forEach((key) => {
      object[camelCase(key)] = item[key];
    });
    return object;
  });
};
