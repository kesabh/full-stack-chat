import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { useAppSelector } from "../../store/hooks";
import { Chat } from "../../store/interface/chat";
import ChatItem from "./ChatItem";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import CreateGroupChatModal from "./CreateGroupChatModal";

interface ChatListProps {
  loading: boolean;
  fetchMessagesForActiveChat: () => Promise<void>;
}

const ChatsList = (props: ChatListProps): JSX.Element => {
  const { loading, fetchMessagesForActiveChat } = props;
  const chatsList = useAppSelector((state) => state.chatsList);

  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
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
            onClick={onOpen}
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
                    <ChatItem
                      key={i}
                      chat={chat}
                      fetchMessagesForActiveChat={fetchMessagesForActiveChat}
                    ></ChatItem>
                  );
                })}
            </>
          )}
        </Box>
      </Box>

      <CreateGroupChatModal
        isOpen={isOpen}
        onClose={onClose}
      ></CreateGroupChatModal>
    </>
  );
};

export default ChatsList;
