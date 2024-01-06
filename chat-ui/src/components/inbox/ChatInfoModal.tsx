import React from "react";
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

interface EditChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  email: string;
  profilePicture: string | undefined;
}

const ChatInfoModal = (props: EditChatModalProps): JSX.Element => {
  const { isOpen, onClose, name, email, profilePicture } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"} fontSize={"30px"} mt={"10px"}>
          {name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" alignItems="center" flexDirection="column">
          <>
            <Avatar size="2xl" name={name} src={profilePicture} />
            <Box>
              <Text mt={"20px"} fontSize={"18px"}>
                Email : {email}
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
