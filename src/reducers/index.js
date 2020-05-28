import { combineReducers } from "redux";

import HomeReducer from "containers/HomePage/reducer.js";
import ProfileReducer from "containers/ProfilePage/reducer.js";

export default combineReducers({
  HomeReducer,
  ProfileReducer
});
