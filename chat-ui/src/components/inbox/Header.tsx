import React, { useRef } from "react";
import {
  BellIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
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

const Header = (): JSX.Element => {
  const searchUserBtnRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const logoutUser = (): void => {
    const { resetStore } = resetStoreProvider();
    resetStore();
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };

  return (
    <header>
      <nav>
        <Grid
          templateColumns="repeat(3, 1fr)"
          bg="white"
          h={"50px"}
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
              <BellIcon width={"25px"} height={"25px"} mr={"10px"}></BellIcon>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant={"ghost"}
                >
                  <ProfileIcon></ProfileIcon>
                </MenuButton>
                <MenuList>
                  <MenuItem>My Profile</MenuItem>
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
    </header>
  );
};

export default Header;
