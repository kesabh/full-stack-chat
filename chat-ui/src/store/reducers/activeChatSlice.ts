import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Chat } from "../interface/chat";
import { initialUserState } from "./userSlice";

export const initialActiveChatState: Chat = {
  chatName: "",
  isGroupChat: false,
  groupAdmin: initialUserState,
  users: [initialUserState],
  _id: "",
};

const activeChatSlice = createSlice({
  name: "activeChat",
  initialState: initialActiveChatState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<Chat>): Chat => {
      return { ...state, ...action.payload };
    },
  },
});

export default activeChatSlice.reducer;
export const { setActiveChat } = activeChatSlice.actions;
