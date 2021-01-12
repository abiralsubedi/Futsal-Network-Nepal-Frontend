import { call, takeLatest } from "redux-saga/effects";
import { runSaga } from "redux-saga";
import { REGISTER } from "../constants";
import registerDefaultSaga, { register } from "../saga";
import * as request from "utils/request";
import { registerSuccess, registerError } from "../actions";

describe("Register Page saga", () => {
  describe("Default function", () => {
    it("default saga", () => {
      const generator = registerDefaultSaga();
      let expectedYield = takeLatest(REGISTER, register);

      let actualYield = generator.next();
      expect(actualYield.value).toEqual(expectedYield);

      actualYield = generator.next();
      expect(actualYield.done).toBe(true);
    });
  });

  describe("Register function", () => {
    it("register for success true", async () => {
      const dummyResponse = { name: "JK Rowling", success: true };

      const requestRegister = jest
        .spyOn(request, "default")
        .mockImplementation(() => Promise.resolve(dummyResponse));
      const dispatched = [];
      await runSaga(
        {
          dispatch: action => dispatched.push(action)
        },
        register,
        { payload: { name: "JK Rowling" } }
      );

      expect(requestRegister).toHaveBeenCalledTimes(1);
      expect(dispatched).toEqual([registerSuccess(dummyResponse)]);
      requestRegister.mockClear();
    });

    it("register for success false", async () => {
      const dummyResponse = { name: "JK Rowling", success: false };

      const requestRegister = jest
        .spyOn(request, "default")
        .mockImplementation(() => Promise.resolve(dummyResponse));
      const dispatched = [];
      const result = await runSaga(
        {
          dispatch: action => dispatched.push(action)
        },
        register,
        { payload: { name: "JK Rowling" } }
      );

      expect(requestRegister).toHaveBeenCalledTimes(1);
      expect(dispatched).toEqual([]);
      requestRegister.mockClear();
    });

    // it("register for API error", async () => {
    //   const requestRegister = jest
    //     .spyOn(request, "default")
    //     .mockImplementation(() => Promise.reject());
    //   const dispatched = [];
    //   const result = await runSaga(
    //     {
    //       dispatch: action => dispatched.push(action)
    //     },
    //     register,
    //     { payload: { name: "JK Rowling" } }
    //   );
    //   expect(requestRegister).toHaveBeenCalledTimes(1);
    //   expect(dispatched).toEqual([registerError()]);
    //   requestRegister.mockClear();
    // });
  });
});
