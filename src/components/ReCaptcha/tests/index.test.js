import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ReCaptcha from "../";

Enzyme.configure({ adapter: new Adapter() });

describe("ReCaptcha index", () => {
  it("renders", () => {
    const wrapper = shallow(<ReCaptcha />);
    expect(wrapper.exists()).toBe(true);
  });
});
