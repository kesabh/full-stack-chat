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
  Tag,
  TagCloseButton,
  TagLabel,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axiosInstace from "../../utils/interceptor";
import { apiUrls } from "../../apiUrls";
import { User } from "../../store/interface/user";
import UserCard from "./UserCard";
import { BeatLoader } from "react-spinners";
import { useAppSelector } from "../../store/hooks";
import { activeChatProvider } from "../../store/provider/activeChatProvider";
import { chatsListProvider } from "../../store/provider/chatsListProvider";

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

  const chatsList = useAppSelector((state) => state.chatsList);
  const { setActiveChat } = activeChatProvider();
  const { updateChatsList } = chatsListProvider();

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
    if (addedUsers.indexOf(user) > -1) return;
    setAddedUsers((prev) => [...prev, user]);
  };

  const removeFromGroupChatUsersList = (userToBeRemoved: User) => {
    const newList = addedUsers.filter(
      (user: User) => user.userId !== userToBeRemoved.userId
    );
    setAddedUsers(newList);
  };

  const handleCreateGroupChat = async (): Promise<void> => {
    try {
      if (!chatName) {
        toast({
          title: "Warning",
          description: "Please enter chat name",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      if (addedUsers.length <= 1) {
        toast({
          title: "Warning",
          description: "Please add two or more users",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }

      const payload = {
        users: addedUsers.map((user: User) => user.userId),
        chatName: chatName.trim(),
      };
      const { data } = await axiosInstace.post(
        apiUrls.CREATE_GROUP_CHAT,
        payload
      );
      if (data.data && data.success) {
        console.log("data", data.data);
        const chat = { ...data.data };
        updateChatsList([chat, ...chatsList]);
        setActiveChat(chat);
        onClose();
      }
    } catch (e) {
      console.error("error while creating new chat", e);
    }
  };

  useEffect(() => {
    setUsers([]);
    setSearchText("");
    setChatName("");
    setAddedUsers([]);
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
                  setChatName(e.target.value);
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

            <Box mt="8px">
              {addedUsers.map((user: User, idx: number) => {
                return (
                  <Tag
                    m="2px"
                    key={idx}
                    size={"md"}
                    borderRadius="full"
                    variant="solid"
                    colorScheme="green"
                  >
                    <TagLabel>{user.name}</TagLabel>
                    <TagCloseButton
                      onClick={() => {
                        removeFromGroupChatUsersList(user);
                      }}
                    />
                  </Tag>
                );
              })}
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
            <Button
              variant="solid"
              colorScheme="green"
              onClick={handleCreateGroupChat}
            >
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateGroupChatModal;
