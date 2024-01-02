import { Avatar, Box, Card, Text } from "@chakra-ui/react";
import * as React from "react";
import { Chat } from "../../store/interface/chat";
import { activeChatProvider } from "../../store/provider/activeChatProvider";
import { useAppSelector } from "../../store/hooks";
import { getStore } from "../../store/store";

interface ChatItemProps {
  chat: Chat;
  fetchMessagesForActiveChat: () => Promise<void>;
}

const ChatItem = (props: ChatItemProps): JSX.Element => {
  const { chat, fetchMessagesForActiveChat } = props;
  const userFromStore = useAppSelector((state) => state.user);

  const activeChat = useAppSelector((state) => state.activeChat);
  const { setActiveChat } = activeChatProvider();

  const getUserImageSrc = (chat: Chat): string | undefined => {
    if (chat.users[0].userId !== userFromStore.userId)
      return chat.users[0].profilePicture;
    else return chat.users[1].profilePicture;
  };

  return (
    <Card
      boxShadow={"0px 0px 5px grey"}
      display={"flex"}
      flexDirection={"row"}
      gap="10px"
      mt="10px"
      alignItems={"center"}
      padding={"10px"}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        if (getStore().state.activeChat._id === chat._id) return;
        setActiveChat(chat);
        fetchMessagesForActiveChat();
      }}
      _hover={{ background: "darkcyan", cursor: "pointer", color: "white" }}
      bg={activeChat._id === chat._id ? "darkcyan" : ""}
      color={activeChat._id === chat._id ? "white" : ""}
    >
      <Box>
        <Avatar size="sm" src={getUserImageSrc(chat)} />
      </Box>
      <Box>
        <Text fontSize="14px" as="b">
          {chat.chatName}
        </Text>
        <Text fontSize={"12px"}>
          <Text>{chat.latestMessage?.content} </Text>
        </Text>
      </Box>
    </Card>
  );
};

export default ChatItem;
