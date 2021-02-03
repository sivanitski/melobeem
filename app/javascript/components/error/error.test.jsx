import { shallow } from "enzyme";
import React from "react";

import Error from "./error";

describe("Components", () => {
  describe("Error", () => {
    it("should render error text", () => {
      const wrapper = shallow(<Error />);
      expect(wrapper.text()).toEqual("failed to load");
    });
  });
});
