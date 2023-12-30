import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./reducers/userSlice";
import chatsListReducer from "./reducers/chatsListSlice";

export const reducer = combineReducers({
  user: userReducer,
  chatsList : chatsListReducer,
});
