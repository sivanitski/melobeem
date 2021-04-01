import { shallow } from "enzyme";
import React from "react";

import VotePopup from "./vote-popup";

describe("Components", () => {
  describe("VotePopup", () => {
    it("should render VotePopup component", () => {
      const mockCallBack = jest.fn();
      const component = shallow(
        <VotePopup handlePopupClose={mockCallBack} childId={1} />
      );

      expect(component).toMatchSnapshot();
    });

    it("should call onClick method", () => {
      const mockCallBack = jest.fn();
      const component = shallow(
        <VotePopup handlePopupClose={mockCallBack} childId={1} />
      );
      expect(mockCallBack.mock.calls.length).toBe(0);
      component.find(".popup__close").simulate("click");
      expect(mockCallBack.mock.calls.length).toBe(1);
    });
  });
});
