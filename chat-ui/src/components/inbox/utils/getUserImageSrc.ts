import { Chat } from "../../../store/interface/chat";
import { getStore } from "../../../store/store";

export const getUserImageSrc = (chat: Chat): string | undefined => {
  const userFromStore = getStore().state.user;
  if (!chat.isGroupChat) {
    if (chat.users[0].userId !== userFromStore.userId)
      return chat.users[0].profilePicture;
    else return chat.users[1].profilePicture;
  }
  return "";
};
