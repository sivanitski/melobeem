import { shallow } from "enzyme";
import React from "react";

import Popup from "./popup";

describe("Components", () => {
  describe("Popup", () => {
    it("should render VotePopup component", () => {
      const mockCallBack = jest.fn();
      const component = shallow(
        <Popup
          handlePopupClose={mockCallBack}
          linkId={1}
          type="vote"
          name="test"
        />
      );

      expect(component).toMatchSnapshot();
    });

    it("should call onClick method", () => {
      const mockCallBack = jest.fn();
      const component = shallow(
        <Popup
          handlePopupClose={mockCallBack}
          linkId={1}
          type="vote"
          name="test"
        />
      );
      expect(mockCallBack.mock.calls.length).toBe(0);
      component.find(".popup__close").simulate("click");
      expect(mockCallBack.mock.calls.length).toBe(1);
    });
  });
});
