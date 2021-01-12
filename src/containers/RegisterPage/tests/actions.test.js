import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  CLEAR_REGISTER_MESSAGE
} from "../constants";
import {
  register,
  registerSuccess,
  registerError,
  clearRegisterMessage
} from "../actions";

describe("Register Page actions", () => {
  describe("request user register", () => {
    it("request register", () => {
      const expected = {
        type: REGISTER,
        payload: "request payload"
      };
      expect(register("request payload")).toEqual(expected);
    });

    it("register success", () => {
      const expected = {
        type: REGISTER_SUCCESS,
        payload: "success response"
      };
      expect(registerSuccess("success response")).toEqual(expected);
    });

    it("register error", () => {
      const expected = {
        type: REGISTER_ERROR,
        error: "error response"
      };
      expect(registerError("error response")).toEqual(expected);
    });
  });

  describe("clear registration messages", () => {
    it("clear message", () => {
      const expected = {
        type: CLEAR_REGISTER_MESSAGE
      };
      expect(clearRegisterMessage()).toEqual(expected);
    });
  });
});
