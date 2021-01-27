export const filterCompetitors = (string, children) => {
  return children.filter((child) =>
    child.name.toLowerCase().includes(string.toLowerCase())
  );
};

export const roundToHundredths = (number) => Math.round(number * 100) / 100;
