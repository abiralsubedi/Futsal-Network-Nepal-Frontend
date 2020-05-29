import { REQUEST_API_DATA, RECEIVE_API_DATA } from "../constants";
import { requestApiData, receiveApiData } from "../actions";

describe("HomePage actions", () => {
  describe("request API data", () => {
    it("request data", () => {
      const expected = {
        type: REQUEST_API_DATA
      };
      expect(requestApiData()).toEqual(expected);
    });

    it("receive data", () => {
      const expected = {
        type: RECEIVE_API_DATA,
        data: "required data"
      };
      expect(receiveApiData("required data")).toEqual(expected);
    });
  });
});
