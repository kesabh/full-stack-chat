import { Box, Input } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import ChatContainer from "./ChatContainer";

const ChatBox = () => {
  const [msgText, setMsgText] = useState("");
  return (
    <Box
      padding={"10px"}
      minH={"100%"}
      display={"flex"}
      justifyContent={"flex-between"}
      flexDirection={"column"}
    >
      <Box
        bg="lightgrey"
        display="flex"
        justifyContent="flex-end"
        flexDirection="column"
        flexGrow={1}
        borderRadius={"5px"}
      >
        <ChatContainer></ChatContainer>
      </Box>
      <Box mt="8px">
        <Input
          placeholder="Enter your message here ..."
          value={msgText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setMsgText(e.target.value)
          }
        ></Input>
      </Box>
    </Box>
  );
};

export default ChatBox;
