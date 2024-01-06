import { Box, Button, Input, Text, useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import ChatContainer from "./ChatContainer";
import { Message } from "../../store/interface/chat";
import { useAppSelector } from "../../store/hooks";
import { socket } from "../../socket";
import { User } from "../../store/interface/user";
import { userTyping } from "./interface/chatBox";
import { BeatLoader } from "react-spinners";
import { getStore } from "../../store/store";
import { ViewIcon } from "@chakra-ui/icons";
import ChatInfoModal from "./ChatInfoModal";
import CreateGroupChatModal from "./CreateGroupChatModal";
import { getUserImageSrc } from "./utils/getUserImageSrc";

/* eslint-disable */
interface ChatBoxProps {
  sendMessage: (content: string) => Promise<void>;
  messages: Message[];
  bottomDivRef: React.MutableRefObject<null>;
  userTypingLoader: userTyping;
  setUserTypingLoader: React.Dispatch<React.SetStateAction<userTyping>>;
  loading: boolean;
}

const ChatBox = (props: ChatBoxProps) => {
  const {
    messages,
    bottomDivRef,
    userTypingLoader,
    setUserTypingLoader,
    loading,
  } = props;
  const [msgText, setMsgText] = useState("");
  const { onOpen, isOpen, onClose } = useDisclosure();

  const activeChat = useAppSelector((state) => state.activeChat);

  const userFromStore = useAppSelector((state) => state.user);

  const sendMessage = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    if (event.key === "Enter" && msgText !== "") {
      setMsgText("");
      props.sendMessage(msgText);
    }
  };

  const handleMessageTyping = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const activeChat = getStore().state.activeChat;
    const receivers = activeChat.users
      .filter((user: User) => user.userId !== userFromStore.userId)
      .map((user: User) => user.userId);

    socket.emit("user_typing", {
      chatId: activeChat._id,
      userFromStore,
      receivers,
    });

    setMsgText(e.target.value);

    const lastTimeTyped = new Date().getTime();
    setTimeout(() => {
      const currTime = new Date().getTime();
      const timeDiff = currTime - lastTimeTyped;
      if (timeDiff >= 2000) {
        socket.emit("stop_typing", {
          chatId: activeChat._id,
          userFromStore,
          receivers,
        });

        setUserTypingLoader({ isTyping: false, name: "" });
      }
    }, 2000);
  };

  React.useEffect(() => {
    setMsgText("");
  }, [activeChat]);

  return (
    <Box
      paddingX={"10px"}
      pb="10px"
      h="calc(100vh - 50px - 40px)"
      display={"flex"}
      justifyContent={"flex-between"}
      flexDirection={"column"}
      borderRadius={"5px"}
      backgroundImage={
        "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"
      }
    >
      {!activeChat._id ? (
        <Box
          h={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text fontSize={"30px"}> Click on a chat to start texting</Text>
        </Box>
      ) : (
        <>
          <Box
            bg="white"
            mx={"-10px"}
            borderRadius={"5px"}
            p={"10px"}
            mb="10px"
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"20px"} fontWeight={"500"} ml={"15px"}>
              {activeChat.chatName}
            </Text>
            <Button onClick={onOpen}>
              <ViewIcon></ViewIcon>
            </Button>
          </Box>
          <Box
            display={"flex"}
            borderRadius={"5px"}
            overflow={"scroll"}
            flexDir={"column"}
            h="calc(100vh - 50px - 40px - 20px)"
            py={"5px"}
          >
            <ChatContainer
              loading={loading}
              bottomDivRef={bottomDivRef}
              messages={messages}
            ></ChatContainer>
          </Box>
          {userTypingLoader.isTyping && (
            <Box
              width={"fit-content"}
              display={"flex"}
              alignItems={"center"}
              fontSize={"12px"}
              bg={"lightgray"}
              paddingX="5px"
              borderRadius={"5px"}
              mt="5px"
            >
              <Text mr={"5px"}>
                {userTypingLoader.name.split(" ")[0]} is typing
              </Text>
              <BeatLoader size={6} />
            </Box>
          )}
          <Box mt="8px">
            <Input
              bg="white"
              placeholder="Enter your message here ..."
              value={msgText}
              onKeyDown={sendMessage}
              onChange={handleMessageTyping}
            ></Input>
          </Box>
        </>
      )}

      {activeChat.isGroupChat ? (
        <CreateGroupChatModal
          isOpen={isOpen}
          onClose={onClose}
          editMode={
            activeChat.groupAdmin.userId === userFromStore.userId
              ? "EDIT"
              : "VIEW"
          }
        />
      ) : (
        <ChatInfoModal
          isOpen={isOpen}
          onClose={onClose}
          name={activeChat.chatName}
          email={
            userFromStore.email === activeChat.users[0].email
              ? activeChat.users[1].email
              : activeChat.users[0].email
          }
          profilePicture={getUserImageSrc(activeChat)}
        ></ChatInfoModal>
      )}
    </Box>
  );
};

export default ChatBox;
