import { filterChildrenByLevel } from "./level";
import { filterCompetitors, roundToHundredths } from "./utils";

const CHILDREN = [
  { name: `Sofie`, id: `1`, likes: 10 },
  { name: `Adam`, id: `2`, likes: 20 },
  { name: `Eve`, id: `3`, likes: 30 },
  { name: `Lora`, id: `4`, likes: 50 },
  { name: `John`, id: `5`, likes: 4 },
  { name: `Adam`, id: `6`, likes: 8 },
];

describe("filterChildrenByLevel util", () => {
  it("Positive filterChildrenByLevel cases", () => {
    expect(filterChildrenByLevel(CHILDREN, 1)).toStrictEqual([
      { name: `John`, id: `5`, likes: 4 },
    ]);
    expect(filterChildrenByLevel(CHILDREN, 2)).toStrictEqual([
      { name: `Adam`, id: `6`, likes: 8 },
    ]);
    expect(filterChildrenByLevel(CHILDREN, 3)).toStrictEqual([
      { name: `Sofie`, id: `1`, likes: 10 },
    ]);
    expect(filterChildrenByLevel(CHILDREN, 4)).toStrictEqual([
      { name: `Adam`, id: `2`, likes: 20 },
      { name: `Eve`, id: `3`, likes: 30 },
    ]);
    expect(filterChildrenByLevel(CHILDREN, 5)).toStrictEqual([
      { name: `Lora`, id: `4`, likes: 50 },
    ]);
    expect(filterChildrenByLevel(CHILDREN, 6)).toStrictEqual([]);
  });

  it("Negative filterChildrenByLevel cases", () => {
    expect(filterChildrenByLevel(undefined, 5)).toStrictEqual([]);
    expect(filterChildrenByLevel(null, 5)).toStrictEqual([]);
    expect(filterChildrenByLevel([], 5)).toStrictEqual([]);
    expect(filterChildrenByLevel(CHILDREN, undefined)).toStrictEqual([]);
  });
});

describe("filterCompetitors util", () => {
  it("Positive filterCompetitors cases", () => {
    expect(filterCompetitors("So", CHILDREN)).toStrictEqual([
      { name: `Sofie`, id: `1`, likes: 10 },
    ]);
    expect(filterCompetitors("ad", CHILDREN)).toStrictEqual([
      { name: `Adam`, id: `2`, likes: 20 },
      { name: `Adam`, id: `6`, likes: 8 },
    ]);
    expect(filterCompetitors("", CHILDREN)).toStrictEqual(CHILDREN);
  });
  it("Negative filterCompetitors cases", () => {
    expect(filterCompetitors("ad", undefined)).toStrictEqual([]);
    expect(filterCompetitors("ad", null)).toStrictEqual([]);
    expect(filterCompetitors("ad", [])).toStrictEqual([]);
  });
});

describe("roundToHundredths util", () => {
  it("Positive roundToHundredths cases", () => {
    expect(roundToHundredths(100)).toStrictEqual(100);
    expect(roundToHundredths(100.112233)).toStrictEqual(100.11);
  });
  it("Negative roundToHundredths cases", () => {
    expect(roundToHundredths(undefined)).toStrictEqual(NaN);
    expect(roundToHundredths(null)).toStrictEqual(0);
    expect(roundToHundredths("aalalala")).toStrictEqual(NaN);
  });
});
