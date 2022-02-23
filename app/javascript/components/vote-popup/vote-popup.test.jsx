import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import VotePopup from "./vote-popup";

describe("Components", () => {
  describe("VotePopup", () => {
    it("should render VotePopup component", () => {
      const component = renderer
        .create(<VotePopup handlePopupClose={() => {}} />)
        .toJSON();

      expect(component).toMatchSnapshot();
    });

    it("should call onClick method", () => {
      const mockCallBack = jest.fn();
      const component = shallow(<VotePopup handlePopupClose={mockCallBack} />);
      expect(mockCallBack.mock.calls.length).toBe(0);
      component.find(".popup__close").simulate("click");
      expect(mockCallBack.mock.calls.length).toBe(1);
    });
  });
});
