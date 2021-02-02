import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import renderer from "react-test-renderer";

import Competitors from "./competitors";

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

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Competitors component", () => {
  it("should render Competitors component", () => {
    const component = renderer
      .create(<Competitors competitors={mockProps.competitors} />)
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});

describe("Competitors handlers", () => {
  it("should make  slider click ", () => {
    const component = mount(
      <Competitors competitors={mockProps.competitors} />
    );

    const competitorsSwiperMenu = component.find(`competitors__menu`);
    console.log(competitorsSwiperMenu);
  });
});

// describe("Button component", () => {
//   it("should call onClick method", () => {
//     const onSliderClick = jest.fn();
//     const component = mount(<Competitors competitors={mockProps.competitors} />);
//     expect(mockCallBack.mock.calls.length).toBe(0);
//     component.find(".btn").simulate("click");
//     expect(mockCallBack.mock.calls.length).toBe(1);
//   });
// });
