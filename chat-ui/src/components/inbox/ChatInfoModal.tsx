import {
  Avatar,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import { getUserImageSrc } from "./utils/getUserImageSrc";

interface EditChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatInfoModal = (props: EditChatModalProps): JSX.Element => {
  const { isOpen, onClose } = props;

  const activeChat = useAppSelector((state) => state.activeChat);
  const userFromStore = useAppSelector((state) => state.user);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"} fontSize={"30px"} mt={"10px"}>
          {activeChat.chatName}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" alignItems="center" flexDirection="column">
          <>
            <Avatar
              size="2xl"
              name={activeChat.chatName}
              src={getUserImageSrc(activeChat)}
            />
            <Box>
              <Text mt={"20px"} fontSize={"18px"}>
                Email :{" "}
                {activeChat.users[0].userId === userFromStore.userId
                  ? activeChat.users[1].email
                  : activeChat.users[0].email}
              </Text>
            </Box>
          </>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChatInfoModal;
