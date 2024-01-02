import { Box, Text } from "@chakra-ui/react";
import * as React from "react";
import { Message } from "../../store/interface/chat";
import { useAppSelector } from "../../store/hooks";
import { BeatLoader } from "react-spinners";

interface ChatContainerProps {
  messages: Message[];
  bottomDivRef: React.MutableRefObject<null>;
}
const ChatContainer = (props: ChatContainerProps): JSX.Element => {
  const { messages, bottomDivRef } = props;
  const userId = useAppSelector((state) => state.user).userId;

  return (
    <>
      {messages.length > 0 ? (
        <Box>
          {messages.length > 0 &&
            messages.map((message, idx) => {
              return (
                <Box
                  width={"100%"}
                  display={"flex"}
                  justifyContent={
                    message.sender._id === userId ? "flex-end" : "flex-start"
                  }
                  key={idx}
                >
                  <Box
                    my={"5px"}
                    mx={"10px"}
                    paddingY={"3px"}
                    paddingX={"12px"}
                    maxWidth={"40%"}
                    borderRadius={"10px"}
                    color={message.sender._id === userId ? "white" : ""}
                    bg={message.sender._id === userId ? "#44bd32" : "#f5f6fa"}
                  >
                    <Text>{message.content}</Text>
                  </Box>
                </Box>
              );
            })}

          <div ref={bottomDivRef}></div>
        </Box>
      ) : (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          h="100%"
        >
          <BeatLoader size="20"></BeatLoader>
        </Box>
      )}
    </>
  );
};

export default ChatContainer;
