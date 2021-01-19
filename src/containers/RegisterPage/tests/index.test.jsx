import * as React from "react";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { act } from "react-dom/test-utils";

import ThemeContextProvider from "context/themeContext";
import SnackbarProvider from "utils/snackbarProvider";

import TextField from "components/TextField";
import ReCaptcha from "components/ReCaptcha";
import RegisterPage from "../";

const mockStore = configureMockStore();
const store = mockStore({ RegisterReducer: {} });

describe("Register index", () => {
  const setState = jest.fn();
  const useStateMock = initState => [initState, setState];

  jest.spyOn(React, "useState").mockImplementation(useStateMock);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders", () => {
    const wrapper = shallow(<RegisterPage />);
    expect(wrapper.exists()).toBe(true);
  });

  const mountRegisterPage = ({ ...props }) => {
    let mountComponent;
    act(() => {
      mountComponent = mount(
        <Provider store={store}>
          <ThemeContextProvider>
            <SnackbarProvider>
              <MemoryRouter>
                <RegisterPage {...props} />
              </MemoryRouter>
            </SnackbarProvider>
          </ThemeContextProvider>
        </Provider>
      );
    });
    return mountComponent;
  };

  const mountedRegisterPage = mountRegisterPage({});

  it("renders 3 text field", () => {
    const wrapper = mountedRegisterPage;
    expect(wrapper.find(TextField).length).toEqual(3);
  });

  it("has empty full name text field", () => {
    const wrapper = mountedRegisterPage;
    expect(wrapper.find("input[id='full-name']").props().value).toEqual("");
  });

  it("has empty email text field", () => {
    const wrapper = mountedRegisterPage;
    expect(wrapper.find("input[type='email']").prop("value")).toEqual("");
  });

  it("when form is submitted, default is prevented", () => {
    const wrapper = mountRegisterPage({});
    let prevented = false;
    wrapper.find("form").simulate("submit", {
      preventDefault: () => {
        prevented = true;
      }
    });
    wrapper
      .find(".MuiSnackbarContent-action .MuiButtonBase-root")
      .simulate("click");

    expect(prevented).toBe(true);
  });

  it("should update all text field", () => {
    const wrapper = mountRegisterPage({});
    act(() => {
      wrapper.find(TextField).map(item => item.props().handleChange("123"));
    });

    expect(setState).toHaveBeenCalledTimes(0);
  });

  it("should update reCaptcha", () => {
    const wrapper = mountRegisterPage({});
    act(() => {
      wrapper.find(ReCaptcha).prop("onCaptchaChange")("123");
    });
    expect(setState).toHaveBeenCalledTimes(0);
  });
});
