import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import RegisterPage from "../";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Register index", () => {
  it("renders", () => {
    const wrapper = shallow(<RegisterPage />);
    expect(wrapper.exists()).toBe(true);
  });
});
