import { Avatar, Box, Text } from "@chakra-ui/react";
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

  const showSenderImage = (idx: number): boolean => {
    if (
      messages[idx]?.sender._id !== userId &&
      messages[idx - 1]?.sender._id !== messages[idx]?.sender._id
    ) {
      return true;
    }

    return false;
  };

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
                  <Box maxWidth={"40%"} borderRadius={"10px"} display="flex">
                    {showSenderImage(idx) && (
                      <Avatar
                        size="xs"
                        name={message?.sender?.name}
                        src={message?.sender?.profilePicture || ""}
                      />
                    )}
                    <Box
                      my={"1px"}
                      ml={showSenderImage(idx) ? "5px" : "29px"}
                      paddingY={"3px"}
                      paddingX={"12px"}
                      borderRadius={"10px"}
                      color={message.sender._id === userId ? "white" : ""}
                      bg={message.sender._id === userId ? "#44bd32" : "#f5f6fa"}
                      fontSize={"15px"}
                    >
                      {showSenderImage(idx) && (
                        <Box display="flex" alignItems="center">
                          {" "}
                          <Text color="#4834d4" as="b" fontSize={"10px"}>
                            ~ {message?.sender?.name}
                          </Text>
                        </Box>
                      )}
                      <Text
                        style={{
                          minWidth: "100% !important",
                          wordBreak: "break-word",
                        }}
                      >
                        {message.content}
                      </Text>
                    </Box>
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
