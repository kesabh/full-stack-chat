import { Avatar, Box, Card, Text } from "@chakra-ui/react";
import * as React from "react";
import { Chat } from "../../store/interface/chat";

interface ChatItemProps {
  chat: Chat;
}

const ChatItem = (props: ChatItemProps): JSX.Element => {
  const { chat } = props;

  return (
    <Card
      boxShadow={"0px 0px 5px grey"}
      display={"flex"}
      flexDirection={"row"}
      gap="10px"
      mt="10px"
      alignItems={"center"}
      padding={"10px"}
      //   onClick={(e: React.MouseEvent<HTMLElement>) => {
      //     handleStartNewChat(e, chat);
      //   }}
      _hover={{ background: "darkcyan", cursor: "pointer", color: "white" }}
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
