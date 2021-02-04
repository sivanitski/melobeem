import { useRequest } from "@umijs/hooks";
import { mount } from "enzyme";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

import Voters from "./voters";
const mockProps = {
  match: {
    params: `111`,
  },
};

jest.mock("@umijs/hooks");

describe("Components", () => {
  describe("Voters", () => {
    it("should render Vote component", () => {
      const component = renderer
        .create(
          <Router>
            <Voters id={mockProps} />
          </Router>
        )
        .toJSON();

      expect(component).toMatchSnapshot();
    });

    it("should render Loading state", () => {
      beforeEach(() => useRequest.mockReturnValue({ loading: true }));
      const component = mount(
        <Router>
          <Voters id={mockProps} />
        </Router>
      );

      // const loading = component.find(".loading").at(0);
      expect(component.exists(".loading")).toBeTruthy();
    });
  });
});
