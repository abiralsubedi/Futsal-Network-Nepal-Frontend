import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import TextField from "../";

Enzyme.configure({ adapter: new Adapter() });

describe("TextField index", () => {
  it("renders", () => {
    const wrapper = shallow(<TextField />);
    expect(wrapper.exists()).toBe(true);
  });

  it("string value changed", () => {
    let userText = "";
    const handleChange = val => {
      userText = val;
    };
    const wrapper = mount(<TextField handleChange={handleChange} />);

    wrapper.find("input").simulate("change", {
      target: { value: "hello" }
    });

    expect(userText).toEqual("hello");
  });

  it("numeric value changed", () => {
    let fieldValue = "";
    const handleChange = () => {
      fieldValue = 10;
    };
    const wrapper = mount(
      <TextField type="number" handleChange={handleChange} />
    );

    wrapper.find("input").simulate("change", {
      target: { value: "10.55" }
    });

    expect(fieldValue).toEqual(10);
  });
});
