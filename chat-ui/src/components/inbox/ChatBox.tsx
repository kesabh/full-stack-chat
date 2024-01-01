import { Box, Input } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import ChatContainer from "./ChatContainer";
import { Message } from "../../store/interface/chat";

interface ChatBoxProps {
  sendMessage: (content: string) => Promise<void>;
  messages: Message[];
  bottomDivRef: React.MutableRefObject<null>;
}

const ChatBox = (props: ChatBoxProps) => {
  const [msgText, setMsgText] = useState("");

  const { messages, bottomDivRef } = props;

  const sendMessage = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    if (event.key === "Enter" && msgText !== "") {
      setMsgText("");
      props.sendMessage(msgText);
    }
  };

  return (
    <Box
      padding={"10px"}
      h="calc(100vh - 50px - 40px)"
      display={"flex"}
      justifyContent={"flex-between"}
      flexDirection={"column"}
    >
      <Box
        bg="lightgrey"
        display={"flex"}
        borderRadius={"5px"}
        overflow={"scroll"}
        flexDir={"column"}
        h="calc(100vh - 50px - 40px - 20px)"
        py={"5px"}
      >
        <ChatContainer
          bottomDivRef={bottomDivRef}
          messages={messages}
        ></ChatContainer>
      </Box>
      <Box mt="8px">
        <Input
          placeholder="Enter your message here ..."
          value={msgText}
          onKeyDown={sendMessage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setMsgText(e.target.value);
          }}
        ></Input>
      </Box>
    </Box>
  );
};

export default ChatBox;
