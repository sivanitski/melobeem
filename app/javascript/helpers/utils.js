export const filterCompetitors = (childName, children) => {
  if (!children) {
    return [];
  }
  return children.filter((child) =>
    child.name.toLowerCase().includes(childName.toLowerCase())
  );
};

export const roundToHundredths = (number) => Math.round(number * 100) / 100;
