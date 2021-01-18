import Enzyme, {mount, shallow} from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import {Leaderboard} from './index';

Enzyme.configure({
  adapter: new Adapter(),
});

describe('Leaderboard', () => {

  it("Should display loading when state is undefined", () => {
    const inputControl = shallow(<Leaderboard />);

    expect(inputControl.find("div").text()).toEqual("Loading...");
});

});