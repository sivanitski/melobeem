import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import renderer from "react-test-renderer";

import HeaderNotLogin from "./header-not-login";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("NewIn component", () => {
  it("should render NewIn component", () => {
    const component = renderer.create(<HeaderNotLogin />).toJSON();

    expect(component).toMatchSnapshot();
  });
});
