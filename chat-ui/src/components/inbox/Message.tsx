import { Text } from "@chakra-ui/react";
import * as React from "react";

interface MessageProps {
  content: string;
}
const Message = (props: MessageProps) => {
  return (
    <>
      <Text> {props.content}</Text>
    </>
  );
};

export default Message;
