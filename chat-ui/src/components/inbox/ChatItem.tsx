import { Avatar, Box, Card, Text } from "@chakra-ui/react";
import * as React from "react";
import { Chat } from "../../store/interface/chat";
import { activeChatProvider } from "../../store/provider/activeChatProvider";
import { useAppSelector } from "../../store/hooks";
import { getStore } from "../../store/store";
import { getUserImageSrc } from "./utils/getUserImageSrc";

interface ChatItemProps {
  chat: Chat;
  fetchMessagesForActiveChat: () => Promise<void>;
}

const ChatItem = (props: ChatItemProps): JSX.Element => {
  const { chat, fetchMessagesForActiveChat } = props;

  const activeChat = useAppSelector((state) => state.activeChat);
  const userFromStore = useAppSelector((state) => state.user);
  const { setActiveChat } = activeChatProvider();

  return (
    <Card
      boxShadow={"0px 0px 5px grey"}
      display={"flex"}
      flexDirection={"row"}
      gap="10px"
      mt="10px"
      alignItems={"center"}
      padding={"10px"}
      onClick={(e: React.MouseEvent<HTMLElement>): void => {
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
          {chat.latestMessage?.sender?.name && (
            <Text fontSize={"10px"} as="span">
              {" "}
              {chat.latestMessage?.sender.name === userFromStore.name
                ? "You"
                : chat.latestMessage?.sender?.name}
              :{" "}
            </Text>
          )}
          {chat.latestMessage?.content}{" "}
        </Text>
      </Box>
    </Card>
  );
};

export default ChatItem;
