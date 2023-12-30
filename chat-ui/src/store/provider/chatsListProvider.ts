import { Chat } from "../interface/chat";
import { setChatsList, updateChatsList } from "../reducers/chatsListSlice";
import { getStore } from "../store";

export const chatsListProvider = (): {
  setChatsList: (chatsList: Chat[]) => {
    payload: Chat[];
    type: "chatsList/setChatsList";
  };
  updateChatsList: (chatsList: Chat[]) => {
    payload: Chat[];
    type: "chatsList/updateChatsList";
  };
} => {
  const { dispatch } = getStore();
  return {
    setChatsList: (
      chatsList: Chat[]
    ): { payload: Chat[]; type: "chatsList/setChatsList" } =>
      dispatch(setChatsList(chatsList)),
    updateChatsList: (
      chatsList: Chat[]
    ): { payload: Chat[]; type: "chatsList/updateChatsList" } =>
      dispatch(updateChatsList(chatsList)),
  };
};
