import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import { apiUrls } from "../../apiUrls";
import axiosInstace from "../../utils/interceptor";
import { User } from "../../store/interface/user";
import UserCard from "./UserCard";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAppSelector } from "../../store/hooks";
import { chatsListProvider } from "../../store/provider/chatsListProvider";

interface SideDrawerForUserSearchProps {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.MutableRefObject<null>;
}

const SideDrawerForUserSearch = (
  props: SideDrawerForUserSearchProps
): JSX.Element => {
  const chatsList = useAppSelector((state) => state.chatsList);
  const { updateChatsList } = chatsListProvider();

  const { isOpen, onClose, btnRef } = props;
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [users, setUsers] = useState<Array<User>>([]);

  const toast = useToast();

  const searchUsers = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    try {
      if (!searchText) {
        toast({
          title: "Warning",
          description: "Please type some text first",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-left",
        });
        return;
      }

      const { data } = await axiosInstace.get(apiUrls.SEARCH_USERS, {
        params: { searchText },
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
            position: "top-left",
          });
        }
      }
    } catch (e) {
      console.error("error occurred while searching users ");
    } finally {
      setLoading(false);
    }
  };

  const handleStartNewChat = async (
    event: React.MouseEvent<HTMLElement>,
    userDetails: User
  ): Promise<void> => {
    try {
      const payload = {
        users: [userDetails.userId],
        chatName: userDetails.name,
      };
      const { data } = await axiosInstace.post(
        apiUrls.CREATE_NEW_CHAT,
        payload
      );
      if (data.data && data.success) {
        updateChatsList([data.data, ...chatsList]);
        onClose();
      }
    } catch (e) {
      console.error("error while creating new chat", e);
    }
  };

  return (
    <>
      <Drawer
        size={"xs"}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Seacr Users</DrawerHeader>

          <DrawerBody>
            <form onSubmit={searchUsers}>
              <Box display="flex" justifyContent="space-between">
                <Input
                  autoFocus={true}
                  fontSize={"14px"}
                  mr={"10px"}
                  placeholder="Search by name or email ..."
                  value={searchText}
                  onChange={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ): void => {
                    setSearchText(event.target.value);
                  }}
                />
                <Button variant="solid" mr={3} onClick={searchUsers}>
                  Go
                </Button>
              </Box>
            </form>

            <Divider mt={"15px"} color={"darkgrey"}></Divider>

            {loading ? (
              <UsersLoadingSkeleton />
            ) : (
              <>
                {users.map((user: User, idx: number) => {
                  return (
                    <UserCard
                      user={user}
                      key={idx}
                      handleStartNewChat={handleStartNewChat}
                    ></UserCard>
                  );
                })}
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawerForUserSearch;
