import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import * as React from "react";
import { useAppSelector } from "../../store/hooks";
import { Chat } from "../../store/interface/chat";
import ChatItem from "./ChatItem";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

interface ChatListProps {
  loading: boolean;
}

const ChatsList = (props: ChatListProps): JSX.Element => {
  const { loading } = props;
  const chatsList = useAppSelector((state) => state.chatsList);
  return (
    <Box paddingX={"20px"} overflow={"scroll"}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        mt="10px"
        alignItems={"center"}
      >
        <Text fontSize={"25px"}>My Chats</Text>
        <Button
          rightIcon={<AddIcon />}
          size={"sm"}
          colorScheme="gray"
          variant="solid"
        >
          New group chat
        </Button>
      </Box>
      <Box
        bg={"lightgray"}
        paddingX={"13px"}
        pt={"5px"}
        pb="10px"
        borderRadius={"5px"}
        my="10px"
      >
        {loading ? (
          <UsersLoadingSkeleton></UsersLoadingSkeleton>
        ) : (
          <>
            {chatsList &&
              chatsList.map((chat: Chat, i: number) => {
                return (
                  <>
                    <ChatItem key={i} chat={chat}></ChatItem>
                  </>
                );
              })}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ChatsList;
