import registerPageReducer, { initialState } from "../reducer";
import {
  REGISTER,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  CLEAR_REGISTER_MESSAGE
} from "../constants";

describe("registerPageReducer", () => {
  it("should return initial state", () => {
    expect(registerPageReducer(undefined, {})).toEqual(initialState);
  });

  describe("handle API data", () => {
    it("should handle REGISTER", () => {
      const action = {
        type: REGISTER,
        payload: {}
      };
      const expectedState = {
        ...initialState,
        registerLoading: true,
        registerSuccess: "",
        registerError: ""
      };

      expect(registerPageReducer(undefined, action)).toEqual(expectedState);
    });

    it("should handle REGISTER Success", () => {
      const action = {
        type: REGISTER_SUCCESS,
        payload: {}
      };
      const expectedState = {
        ...initialState,
        registerLoading: false,
        registerSuccess: {}
      };

      expect(registerPageReducer(undefined, action)).toEqual(expectedState);
    });

    it("should handle REGISTER Error", () => {
      const action = {
        type: REGISTER_ERROR,
        error: "Register Failed"
      };
      const expectedState = {
        ...initialState,
        registerLoading: false,
        registerError: "Register Failed"
      };

      expect(registerPageReducer(undefined, action)).toEqual(expectedState);
    });
  });

  it("should handle clear registration message", () => {
    const action = {
      type: CLEAR_REGISTER_MESSAGE
    };
    const expectedState = {
      ...initialState,
      registerLoading: false,
      registerError: "",
      registerSuccess: ""
    };

    expect(registerPageReducer(undefined, action)).toEqual(expectedState);
  });
});
