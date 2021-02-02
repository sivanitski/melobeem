import React from "react";
import renderer from "react-test-renderer";

import CompetitionInfo from "./competition-info";

const mockProps = {
  timeLeft: `1995-12-17T03:24:00`,
  prize: `105`,
};

describe("competition-info component", () => {
  it("should render competition-info component", () => {
    const component = renderer
      .create(
        <CompetitionInfo
          timeLeft={mockProps.timeLeft}
          prize={mockProps.prize}
        />
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
