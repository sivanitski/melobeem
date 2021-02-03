import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

import Vote from "./vote";

const mockProps = {
  location: {
    propsSearch: {
      id: `111`,
      name: `Julia Mur`,
      avatar: `some/url/avatar.png`,
      likes: 1000,
      parentName: `John Depp`,
      rank: 2,
    },
  },
  match: {
    params: `111`,
  },
};

describe("Components", () => {
  describe("Vote", () => {
    it("should render Vote component", () => {
      const component = renderer
        .create(
          <Router>
            <Vote location={mockProps.location} match={mockProps.match} />
          </Router>
        )
        .toJSON();

      expect(component).toMatchSnapshot();
    });
  });
});
