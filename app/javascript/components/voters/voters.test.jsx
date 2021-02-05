import { useRequest } from "ahooks";
import { mount } from "enzyme";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

import Voters from "./voters";
const mockMatch = {
  params: {
    id: "111",
  },
};

describe("Components", () => {
  describe("Voters", () => {
    it("should render Vote component", () => {
      const component = renderer
        .create(
          <Router>
            <Voters match={mockMatch} />
          </Router>
        )
        .toJSON();

      expect(component).toMatchSnapshot();
    });

    it("should render Loading state", () => {
      beforeEach(() => useRequest.mockReturnValue({ loading: true }));
      const component = mount(
        <Router>
          <Voters match={mockMatch} />
        </Router>
      );

      expect(component.exists(".loading")).toBeTruthy();
    });
  });
});
