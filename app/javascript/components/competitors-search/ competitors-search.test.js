import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import renderer from "react-test-renderer";

import CompetitorsSearch from "./competitors-search";

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

describe("CompetitorsSearch", () => {
  it("should render CompetitorsSearch component", () => {
    const component = renderer
      .create(<CompetitorsSearch competitors={mockProps.competitors} />)
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  it("should hide resetButton initially", () => {
    const component = shallow(
      <CompetitorsSearch competitors={mockProps.competitors} />
    );
    const competitorsResetButton = component.find(".search__button").at(0);
    expect(competitorsResetButton.exists()).toBeFalsy();
  });

  it("should show reset button after input", () => {
    const component = shallow(
      <CompetitorsSearch competitors={mockProps.competitors} />
    );

    const input = component.find(".search__input").at(0);
    input.simulate("change", { currentTarget: { value: `John` } });
    expect(component.exists(".search__button")).toBeTruthy();
  });
});
