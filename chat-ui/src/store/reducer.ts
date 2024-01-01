import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./reducers/userSlice";
import chatsListReducer from "./reducers/chatsListSlice";
import activeChatReducer from "./reducers/activeChatSlice";

export const reducer = combineReducers({
  user: userReducer,
  chatsList: chatsListReducer,
  activeChat: activeChatReducer,
});
