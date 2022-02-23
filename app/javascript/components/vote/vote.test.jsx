import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

import Vote from "./vote";

const mockMatch = {
  match: {
    params: {
      id: "111",
    },
  },
};
describe("Components", () => {
  describe("Vote", () => {
    it("should render Vote component", () => {
      const component = renderer
        .create(
          <Router>
            <Vote match={mockMatch} />
          </Router>
        )
        .toJSON();

      expect(component).toMatchSnapshot();
    });
  });
});
