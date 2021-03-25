// min number of likes that we should have to be on this level

export const LEVEL_INTERVALS = {
  1: 0,
  2: 2,
  3: 5,
  4: 10,
  5: 15,
  6: 20,
  7: 30,
  8: 40,
  9: 50,
  10: 60,
  11: 70,
  12: 80,
  13: 90,
  14: 100,
  15: 110,
  16: 120,
  17: 130,
  18: 140,
  19: 160,
  20: 180,
  21: 200,
  22: 220,
  23: 240,
  24: 260,
  25: 280,
  26: 300,
  27: 330,
  28: 360,
  29: 390,
  30: 420,
  31: 450,
  32: 480,
  33: 500,
  34: 550,
  35: 600,
  36: 650,
  37: 700,
  38: 750,
  39: 800,
  40: 850,
  41: 900,
  42: 950,
  43: 1000,
  44: 1100,
  45: 1200,
  46: 1300,
  47: 1400,
  48: 1500,
  49: 1600,
  50: 1700,
  51: 1800,
  52: 1900,
  53: 2000,
  54: 2100,
  55: 2200,
  56: 2300,
  57: 2400,
  58: 2500,
  59: 2600,
  60: 2700,
  61: 2800,
  62: 2900,
  63: 3000,
  64: 3300,
  65: 3600,
  66: 3900,
  67: 4200,
  68: 4500,
  69: 4800,
  70: 5100,
  71: 5400,
  72: 5700,
  73: 6000,
  74: 6300,
  75: 6600,
  76: 6900,
  77: 7200,
  78: 7500,
  79: 7800,
  80: 8100,
  81: 8400,
  82: 8700,
  83: 9000,
  84: 9500,
  85: 10000,
  86: 10500,
  87: 11000,
  88: 11500,
  89: 12000,
  90: 12500,
  91: 13000,
  92: 13500,
  93: 14000,
  94: 14500,
  95: 15000,
  96: 15500,
  97: 16000,
  98: 16500,
  99: 17000,
  100: 17500,
  101: 18000,
  102: 18500,
  103: 19000,
  104: 19500,
  105: 20000,
  106: 20500,
  107: 21000,
  108: 21500,
  109: 22000,
  110: 22500,
  111: 23000,
  112: 23500,
  113: 24000,
  114: 24500,
  115: 25000,
  116: 25500,
  117: 26000,
  118: 26500,
  119: 27000,
  120: 27500,
  121: 28000,
  122: 28500,
  123: 29000,
  124: 29500,
  125: 30000,
};

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

export const findAllExsistingLevels = (children) => {
  const levelSet = new Set();
  children.sort(compareLevels).forEach((child) => {
    levelSet.add(child.level);
  });

  return Array.from(levelSet);
};

export const filterChildrenByLevel = (children, level) => {
  return children.filter((child) => child.level === level);
};
