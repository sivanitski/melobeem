import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import renderer from "react-test-renderer";

import Leaderboard from "./leaderboard";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Leaderboard", () => {
  it("should render Competitors component", () => {
    const component = renderer.create(<Leaderboard />).toJSON();

    expect(component).toMatchSnapshot();
  });
});
