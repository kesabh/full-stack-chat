import { Chat } from "../interface/chat";
import { setActiveChat } from "../reducers/activeChatSlice";
import { getStore } from "../store";

export const activeChatProvider = (): {
  setActiveChat: (chat: Chat) => {
    payload: Chat;
    type: "activeChat/setActiveChat";
  };
} => {
  const { dispatch } = getStore();
  return {
    setActiveChat: (
      chat: Chat
    ): { payload: Chat; type: "activeChat/setActiveChat" } =>
      dispatch(setActiveChat(chat)),
  };
};
