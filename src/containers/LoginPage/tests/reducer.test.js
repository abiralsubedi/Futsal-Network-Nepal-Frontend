import homePageReducer, { initialState } from "../reducer";
import { RECEIVE_API_DATA } from "../constants";

describe("homePageReducer", () => {
  it("should return initial state", () => {
    expect(homePageReducer(undefined, {})).toEqual(initialState);
  });

  describe("handle API data", () => {
    it("should handle RECEIVE_API_DATA", () => {
      const action = {
        type: RECEIVE_API_DATA,
        data: "hello"
      };
      const expectedState = { ...initialState, fetched: "hello" };

      expect(homePageReducer(undefined, action)).toEqual(expectedState);
    });
  });
});
