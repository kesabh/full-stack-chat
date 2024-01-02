import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axiosInstace from "../../utils/interceptor";
import { apiUrls } from "../../apiUrls";
import { User } from "../../store/interface/user";

interface CreateGroupChatMOdalProps {
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const CreateGroupChatModal = (
  props: CreateGroupChatMOdalProps
): JSX.Element => {
  const { isOpen, onClose, onOpen } = props;

  const [chatName, setChatName] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const searchUsersUtil = async (text: string): Promise<void> => {
    const { data } = await axiosInstace.get(apiUrls.SEARCH_USERS, {
      params: { searchText: text },
    });
    // console.log(data);
  };

  const debouncedFn = useCallback((fn: (text: string) => Promise<void>) => {
    let timeoutId: NodeJS.Timeout;

    return function (text: string) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        fn(text);
      }, 300);
    };
  }, []);

  const debouncedSearch = useCallback(debouncedFn(searchUsersUtil), []);

  const searchUsers = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value);

    //debounce fn here
    debouncedSearch(event.target.value);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={"10px"}>
              <Input
                type="text"
                placeholder="Enter chat name..."
                value={chatName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setChatName(e.target.name);
                }}
              />
            </Box>
            <Box>
              <Input
                type="text"
                placeholder="Search user..."
                value={searchText}
                onChange={searchUsers}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="solid" colorScheme="green">
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateGroupChatModal;
