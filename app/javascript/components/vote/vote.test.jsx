import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

import Vote from "./vote";

describe("Components", () => {
  describe("Vote", () => {
    it("should render Vote component", () => {
      const component = renderer
        .create(
          <Router>
            <Vote />
          </Router>
        )
        .toJSON();

      expect(component).toMatchSnapshot();
    });
  });
});
