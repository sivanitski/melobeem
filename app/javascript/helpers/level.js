// min number of likes that we should have to be on this level

export const LEVEL_INTERVALS = {
  1: 2,
  2: 5,
  3: 25,
  4: 70,
  5: 150,
  6: 400,
  7: 1000,
  8: 1500,
  9: 2000,
  10: 2500,
  11: 3000,
  12: 3500,
  13: 4000,
  14: 4500,
  15: 5000,
  16: 5500,
  17: 6000,
  18: 6500,
  19: 7000,
  20: 7500,
  21: 8000,
  22: 8500,
  23: 9000,
  24: 9500,
  25: 10000,
  26: 10500,
  27: 11000,
  28: 11500,
  29: 12000,
  30: 12500,
  31: 13000,
  32: 13500,
  33: 14000,
  34: 14500,
  35: 15000,
  36: 15500,
  37: 16000,
  38: 16500,
  39: 17000,
  40: 17500,
  41: 18000,
  42: 18500,
  43: 19000,
  44: 19500,
  45: 20000,
  46: 20500,
  47: 21000,
  48: 21500,
  49: 22000,
  50: 22500,
  51: 23000,
  52: 23500,
  53: 24000,
  54: 24500,
  55: 25000,
  56: 25500,
  57: 26000,
  58: 26500,
  59: 27000,
  60: 27500,
  61: 28000,
  62: 28500,
  63: 29000,
  64: 29500,
  65: 30000,
  66: 30500,
  67: 31000,
  68: 31500,
  69: 32000,
  70: 32500,
  71: 33000,
  72: 33500,
  73: 34000,
  74: 34500,
  75: 35000,
  76: 35500,
  77: 36000,
  78: 36500,
  79: 37000,
  80: 37500,
  81: 38000,
  82: 38500,
  83: 39000,
  84: 39500,
  85: 40000,
  86: 40500,
  87: 41000,
  88: 41500,
  89: 42000,
  90: 42500,
  91: 43000,
  92: 43500,
  93: 44000,
  94: 44500,
  95: 45000,
  96: 45500,
  97: 46000,
  98: 46500,
  99: 47000,
  100: 47500,
  101: 48000,
  102: 48500,
  103: 49000,
  104: 49500,
  105: 50000,
  106: 50500,
  107: 51000,
  108: 51500,
  109: 52000,
  110: 52500,
  111: 53000,
  112: 53500,
  113: 54000,
  114: 54500,
  115: 55000,
  116: 55500,
  117: 56000,
  118: 56500,
  119: 57000,
  120: 57500,
  121: 58000,
  122: 58500,
  123: 59000,
  124: 59500,
};

export const getVoteValueFromLevel = (level) => LEVEL_INTERVALS[level];

export const getVoteIntervalFromLevel = (level) => {
  return `(From ${getVoteValueFromLevel(level)} to ${getVoteValueFromLevel(
    level + 1
  )} votes)`;
};

export const getAnimationLevel = (totalVotes, level) =>
  1 - totalVotes / LEVEL_INTERVALS[level + 1];

export const defineMaxLevel = (children) => {
  return Math.max(...children.map((child) => child.level), 1);
};

export const defineMinLevel = (children) => {
  return Math.min(...children.map((child) => child.level));
};

export const defineLevels = (children) => {
  const levels = {};
  levels.minLevel = defineMinLevel(children);
  levels.maxLevel = defineMaxLevel(children);
  return levels;
};

export function compareLevels(a, b) {
  return a.level - b.level;
}

export const filterChildrenByLevel = (children, level) => {
  return children.filter((child) => child.level === level);
};
