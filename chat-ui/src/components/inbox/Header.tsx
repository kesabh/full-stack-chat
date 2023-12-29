import React, { useRef } from "react";
import { BellIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
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
import DefaultProfileIcon from "./DefauldProfileIcon";
import SideDrawerForUserSearch from "./SideDrawerForUserSearch";

const Header = (): JSX.Element => {
  const searchUserBtnRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            justifyContent="flex-start"
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
                  <DefaultProfileIcon></DefaultProfileIcon>
                </MenuButton>
                <MenuList>
                  <MenuItem>My Profile</MenuItem>
                  <MenuDivider />
                  <MenuItem>Logout</MenuItem>
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