// min number of likes that we should have to be on this level
export const LEVEL_INTERVALS = {
  1: 0,
  2: 5,
  3: 10,
  4: 20,
  5: 40,
  6: 60,
};

// max level
export const MAX_LEVEL = 6;

// filter users by their likes
export const filterChildrenByLevel = (children, level) => {
  if (!children) {
    return [];
  }
  switch (level) {
    case MAX_LEVEL:
      return children.filter(
        (child) => child.likes > LEVEL_INTERVALS[MAX_LEVEL]
      );
    default:
      return children.filter(
        (child) =>
          child.likes >= LEVEL_INTERVALS[level] &&
          child.likes < LEVEL_INTERVALS[level + 1]
      );
  }
};
