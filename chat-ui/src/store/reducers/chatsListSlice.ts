import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Chat } from "../interface/chat";

const initalChatListState: Chat[] = [];

const chatsListSlice = createSlice({
  name: "chatsList",
  initialState: initalChatListState,
  reducers: {
    setChatsList: (state, action: PayloadAction<Chat[]>): Chat[] => {
      state = action.payload;
      return state;
    },
    updateChatsList: (state, action: PayloadAction<Chat[]>): Chat[] => {
      state = action.payload;
      return state;
    },
  },
});

export default chatsListSlice.reducer;
export const { setChatsList, updateChatsList } = chatsListSlice.actions;
