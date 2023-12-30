import { User } from "./user";

interface Message {
  content: string;
  sender: User;
  chatId: string;
}

export interface Chat {
  chatName: string;
  latestMessage?: Message;
  isGroupChat: boolean;
  groupAdmin: User;
  users: Array<User>;
}
