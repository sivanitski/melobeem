import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import Leaderboard from "./leaderboard";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Leaderboard", () => {
  it("Should display loading when state is undefined", () => {
    const inputControl = shallow(<Leaderboard />);

    expect(inputControl.find("div").text()).toEqual("Loading...");
  });
});
