import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

import Footer from "./footer";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Footer component", () => {
  it("should render Footer component", () => {
    const component = renderer
      .create(
        <Router>
          <Footer />
        </Router>
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
