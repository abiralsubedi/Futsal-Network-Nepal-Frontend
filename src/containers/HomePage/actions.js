import { REQUEST_API_DATA, RECEIVE_API_DATA } from "./constants";

export const requestApiData = () => {
  console.log("hello there");
  return { type: REQUEST_API_DATA };
};
export const receiveApiData = data => ({ type: RECEIVE_API_DATA, data });
