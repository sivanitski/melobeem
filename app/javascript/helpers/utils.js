export const filterCompetitors = (string, children) => {
  return children.filter((child) =>
    child.name.toLowerCase().includes(string.toLowerCase())
  );
};
