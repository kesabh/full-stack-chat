import React, { useCallback, useEffect, useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import axiosInstace from "../../utils/interceptor";
import { apiUrls } from "../../apiUrls";
import { User } from "../../store/interface/user";
import UserCard from "./UserCard";
import { BeatLoader } from "react-spinners";

interface CreateGroupChatMOdalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateGroupChatModal = (
  props: CreateGroupChatMOdalProps
): JSX.Element => {
  const { isOpen, onClose } = props;

  const [chatName, setChatName] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<User>>([]);
  const [addedUsers, setAddedUsers] = useState<Array<User>>([]);

  const toast = useToast();

  const searchUsersUtil = async (text: string): Promise<void> => {
    setLoading(true);
    try {
      const { data } = await axiosInstace.get(apiUrls.SEARCH_USERS, {
        params: { searchText: text },
      });
      if (data.data) {
        setUsers(data.data);
        if (data.data && data.data.length == 0) {
          toast({
            title: "Error",
            description: "No Users found",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
        }
      }
    } catch (e) {
      console.error("error while fetching users", e);
    } finally {
      setLoading(false);
    }
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
    debouncedSearch(event.target.value);
  };

  const addToGroupChatUsersList = (
    event: React.MouseEvent<HTMLElement>,
    user: User
  ) => {
    setAddedUsers((prev) => [...prev, user]);
  };

  useEffect(() => {
    setUsers([]);
    setSearchText("");
  }, [isOpen]);

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

            {loading ? (
              <Box textAlign={"center"} mt={"10px"}>
                <BeatLoader size={10} />
              </Box>
            ) : (
              <>
                {users.map((user: User, idx: number) => {
                  return (
                    <UserCard
                      user={user}
                      key={idx}
                      onCardClick={addToGroupChatUsersList}
                    ></UserCard>
                  );
                })}
              </>
            )}
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
