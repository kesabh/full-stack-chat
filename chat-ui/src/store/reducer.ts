import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./reducers/userSlice";
import chatsListReducer from "./reducers/chatsListSlice";
import activeChatReducer from "./reducers/activeChatSlice";
import notificationsReducer from "./reducers/notificationsSlice";

export const reducer = combineReducers({
  user: userReducer,
  chatsList: chatsListReducer,
  activeChat: activeChatReducer,
  notifications: notificationsReducer,
});
