import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

import CompetitorsList from "./competitors-list";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockProps = {
  competitors: [
    {
      id: `111`,
      name: `Julia Mur`,
      avatar: `some/url/avatar.png`,
      likes: 1000,
      parentName: `John Depp`,
      rank: 2,
    },
    {
      id: `112`,
      name: `Elena Black`,
      avatar: `some/url/avatar.png`,
      likes: 2000,
      parentName: `White Black`,
      rank: 1,
    },
    {
      id: `113`,
      name: `Tom Raddle`,
      avatar: `some/url/avatar.png`,
      likes: 100,
      parentName: `Some Name`,
      rank: 1,
    },
  ],
};

describe("NewIn component", () => {
  it("should render NewIn component", () => {
    const component = renderer
      .create(
        <Router>
          <CompetitorsList competitors={mockProps.competitors} />
        </Router>
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
