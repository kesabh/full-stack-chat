import { Box, Text } from "@chakra-ui/react";
import * as React from "react";
import { Message } from "../../store/interface/chat";
import { useAppSelector } from "../../store/hooks";
import { BeatLoader } from "react-spinners";

interface ChatContainerProps {
  messages: Message[];
  bottomDivRef: React.MutableRefObject<null>;
  loading: boolean;
}
const ChatContainer = (props: ChatContainerProps): JSX.Element => {
  const { messages, bottomDivRef, loading } = props;
  const userId = useAppSelector((state) => state.user).userId;

  return (
    <>
      {!loading ? (
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
                    my={"1px"}
                    mx={"10px"}
                    paddingY={"3px"}
                    paddingX={"12px"}
                    maxWidth={"40%"}
                    borderRadius={"10px"}
                    color={message.sender._id === userId ? "white" : ""}
                    bg={message.sender._id === userId ? "#44bd32" : "#f5f6fa"}
                  >
                    <Text fontSize={"15px"}>{message.content}</Text>
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
