import { Avatar, Box, Card, Text } from "@chakra-ui/react";
import * as React from "react";
import { Chat } from "../../store/interface/chat";
import { activeChatProvider } from "../../store/provider/activeChatProvider";
import { useAppSelector } from "../../store/hooks";

interface ChatItemProps {
  chat: Chat;
  fetchMessagesForActiveChat: () => Promise<void>;
}

const ChatItem = (props: ChatItemProps): JSX.Element => {
  const { chat, fetchMessagesForActiveChat } = props;

  const activeChat = useAppSelector((state) => state.activeChat);
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
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        setActiveChat(chat);
        fetchMessagesForActiveChat();
      }}
      _hover={{ background: "darkcyan", cursor: "pointer", color: "white" }}
      bg={activeChat._id === chat._id ? "darkcyan" : ""}
      color={activeChat._id === chat._id ? "white" : ""}
    >
      <Box>
        <Avatar size="sm" src={""} />
      </Box>
      <Box>
        <Text fontSize="14px">{chat.chatName}</Text>
        <Text fontSize={"12px"}>
          <Text as="b">Email: </Text>
          {/* {chat.email} */}
        </Text>
      </Box>
    </Card>
  );
};

export default ChatItem;
