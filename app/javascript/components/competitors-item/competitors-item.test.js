import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

import CompetitorsItem from "./competitors-item";

const mockProps = {
  competitor: {
    id: `111`,
    name: `Julia Mur`,
    avatar: `some/url/avatar.png`,
    likes: 1000,
    parentName: `John Depp`,
    rank: 1,
  },
};

describe("CompetitorsItem component", () => {
  it("should render CompetitorsItem component", () => {
    const component = renderer
      .create(
        <Router>
          <CompetitorsItem competitor={mockProps.competitor} />
        </Router>
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
