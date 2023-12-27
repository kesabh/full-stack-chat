import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./reducers/userSlice";

export const reducer = combineReducers({
  user: userReducer,
});
