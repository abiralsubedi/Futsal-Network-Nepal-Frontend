import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ThemeContextProvider from "context/themeContext";
import { SnackbarProvider } from "notistack";

import TextField from "components/TextField";
import RegisterPage from "../";
import { Search } from "@material-ui/icons";

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
const store = mockStore({ RegisterReducer: {} });

describe("Register index", () => {
  it("renders", () => {
    const wrapper = shallow(<RegisterPage />);
    expect(wrapper.exists()).toBe(true);
  });

  const mountRegisterPage = ({ ...props }) => {
    return mount(
      <Provider store={store}>
        <ThemeContextProvider>
          <SnackbarProvider maxSnack={4}>
            <MemoryRouter>
              <RegisterPage {...props} />
            </MemoryRouter>
          </SnackbarProvider>
        </ThemeContextProvider>
      </Provider>
    );
  };

  const mountedRegisterPage = mountRegisterPage({});

  it("renders 3 text field", () => {
    const wrapper = mountedRegisterPage;
    expect(wrapper.find(TextField).length).toEqual(3);
  });

  // it("should update full name", () => {
  //   const wrapper = mountedRegisterPage;
  //   // expect(wrapper.state().fullName).toEqual("");

  //   const { handleChange } = wrapper.find(TextField).at(0).props();

  //   handleChange();
  // });

  it("when form is submitted, default is prevented", () => {
    const wrapper = mountRegisterPage({});
    let prevented = false;
    wrapper.find("form").simulate("submit", {
      preventDefault: () => {
        prevented = true;
      }
    });
    expect(prevented).toBe(true);
  });
});
