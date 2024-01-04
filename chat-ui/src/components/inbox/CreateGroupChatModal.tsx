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
import { Chat } from "../../store/interface/chat";

interface CreateGroupChatMOdalProps {
  isOpen: boolean;
  onClose: () => void;
  editMode?: "EDIT" | "VIEW";
}

const CreateGroupChatModal = (
  props: CreateGroupChatMOdalProps
): JSX.Element => {
  const { isOpen, onClose, editMode } = props;

  const [chatName, setChatName] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<User>>([]);
  const [addedUsers, setAddedUsers] = useState<Array<User>>([]);

  const chatsList = useAppSelector((state) => state.chatsList);
  const activeChat = useAppSelector((state) => state.activeChat);

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
  ): void => {
    if (addedUsers.indexOf(user) > -1) return;
    setAddedUsers((prev) => [...prev, user]);
  };

  const removeFromGroupChatUsersList = (userToBeRemoved: User): void => {
    if (editMode === "VIEW") return;
    const newList = addedUsers.filter(
      (user: User) => user.userId !== userToBeRemoved.userId
    );
    setAddedUsers(newList);
  };

  const saveGroupChat = async (): Promise<void> => {
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
      const { data } =
        editMode === "EDIT"
          ? await axiosInstace.put(apiUrls.UPDATE_GROUP_CHAT, {
              ...payload,
              chatId: activeChat._id,
            })
          : await axiosInstace.post(apiUrls.CREATE_GROUP_CHAT, payload);
      if (data.data && data.success) {
        const chatResponse = { ...data.data };
        const updatedChatsList =
          editMode === "EDIT"
            ? chatsList.map((chat: Chat) => {
                if (chatResponse._id === chat._id) return chatResponse;
                else return chat;
              })
            : [chatResponse, ...chatsList];
        updateChatsList(updatedChatsList);
        if (editMode !== "EDIT") {
          setActiveChat(chatResponse);
        }
        onClose();
      }
    } catch (e) {
      console.error("error while creating new chat", e);
    }
  };

  useEffect(() => {
    setUsers([]);
    setSearchText("");
    setChatName(editMode ? activeChat.chatName : "");
    setAddedUsers(editMode ? activeChat.users : []);
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {!editMode ? "Create Group Chat" : activeChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={"10px"}>
              <Input
                readOnly={editMode === "VIEW"}
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
                disabled={editMode === "VIEW"}
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

            {(editMode === "EDIT" || !editMode) && (
              <Button
                variant="solid"
                colorScheme="green"
                onClick={saveGroupChat}
              >
                {editMode === "EDIT" ? "Save" : "Create Chat"}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateGroupChatModal;
