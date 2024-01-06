import React, { useRef } from "react";
import {
  BellIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ProfileIcon from "./ProfileIcon";
import SideDrawerForUserSearch from "./SideDrawerForUserSearch";
import { useNavigate } from "react-router-dom";
import { resetStoreProvider } from "../../store/provider/rsetStoreProvider";
import ChatInfoModal from "./ChatInfoModal";
import { useAppSelector } from "../../store/hooks";
import { Notification } from "../../store/interface/notification";
import { notificationsProvider } from "../../store/provider/notificationsProvider";
import { activeChatProvider } from "../../store/provider/activeChatProvider";
import { Chat } from "../../store/interface/chat";

interface HeaderProps {
  fetchMessagesForActiveChat: () => Promise<void>;
}

const Header = (props: HeaderProps): JSX.Element => {
  const { fetchMessagesForActiveChat } = props;

  const userFromStore = useAppSelector((state) => state.user);
  const notifications = useAppSelector((state) => state.notifications);
  const chatsList = useAppSelector((state) => state.chatsList);

  const { deleteNotification } = notificationsProvider();
  const { setActiveChat } = activeChatProvider();

  const searchUserBtnRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenUserInfoModal,
    onOpen: onOpenUserInfoModal,
    onClose: onCloseUserInfoModal,
  } = useDisclosure();

  const navigate = useNavigate();

  const logoutUser = (): void => {
    const { resetStore } = resetStoreProvider();
    resetStore();
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };

  const handleRemoveNotification = (notification: Notification): void => {
    const chat = chatsList.find((chat: Chat) => {
      return chat._id === notification.chatId;
    });
    chat && setActiveChat(chat);
    fetchMessagesForActiveChat();
    deleteNotification(notification);
  };

  return (
    <header>
      <nav>
        <Grid
          padding={"5px"}
          borderColor={"gray.200"}
          borderWidth={"6px"}
          borderStyle={"solid"}
          templateColumns="repeat(3, 1fr)"
          bg="white"
          h={"60px"}
          display={"flex"}
        >
          <GridItem
            width={"100%"}
            ml="8px"
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Button
              ref={searchUserBtnRef}
              leftIcon={<Search2Icon />}
              rightIcon={<ChevronRightIcon />}
              px="20px"
              onClick={onOpen}
              colorScheme="gray"
              variant="outline"
            >
              <Text as="b" fontSize={"md"}>
                Search User
              </Text>
            </Button>
          </GridItem>
          <GridItem
            width={"100%"}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Heading> Convo Connect </Heading>
          </GridItem>
          <GridItem
            width={"100%"}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mr={"15px"}
          >
            <Box>
              <Menu>
                <MenuButton as={Button} variant={"ghost"}>
                  <BellIcon width={"25px"} height={"25px"}></BellIcon>
                  {notifications.length > 0 && (
                    <Badge
                      variant="solid"
                      colorScheme="green"
                      mr="10px"
                      ml="-5px"
                      mb="15px"
                      borderRadius={"100%"}
                    >
                      {notifications.length}
                    </Badge>
                  )}
                </MenuButton>
                <MenuList>
                  {notifications &&
                    notifications.map((notification: Notification) => {
                      return (
                        <MenuItem
                          key={notification.chatId}
                          onClick={(): void => {
                            handleRemoveNotification(notification);
                          }}
                        >
                          New message from {notification.chatName}
                        </MenuItem>
                      );
                    })}
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant={"ghost"}
                >
                  <ProfileIcon></ProfileIcon>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={onOpenUserInfoModal}>My Profile</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={logoutUser}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </GridItem>
        </Grid>
      </nav>

      <SideDrawerForUserSearch
        isOpen={isOpen}
        onClose={onClose}
        btnRef={searchUserBtnRef}
      />

      <ChatInfoModal
        isOpen={isOpenUserInfoModal}
        onClose={onCloseUserInfoModal}
        name={userFromStore.name}
        email={userFromStore.email}
        profilePicture={userFromStore.profilePicture}
      ></ChatInfoModal>
    </header>
  );
};

export default Header;
