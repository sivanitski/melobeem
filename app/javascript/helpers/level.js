// min number of likes that we should have to be on this level

export const LEVEL_INTERVALS = {
  1: 0,
  2: 2,
  3: 5,
  4: 10,
  5: 15,
  6: 20,
};

// max level
export const MAX_LEVEL = 6;

// filter users by their likes
export const filterChildrenByLevel = (children, level) => {
  switch (level) {
    case MAX_LEVEL:
      return children.filter(
        (child) => child.totalVotes > LEVEL_INTERVALS[MAX_LEVEL]
      );
    default:
      return children.filter(
        (child) =>
          child.totalVotes >= LEVEL_INTERVALS[level] &&
          child.totalVotes < LEVEL_INTERVALS[level + 1]
      );
  }
};

export const addPositionToCompetitors = (children) => {
  children.sort(function (a, b) {
    return b.totalVotes - a.likes;
  });
  return children.forEach((child, index) => {
    child.position = index + 1;
  });
};
