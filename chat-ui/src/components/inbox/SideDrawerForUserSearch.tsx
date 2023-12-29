import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useToast,
} from "@chakra-ui/react";
import { apiUrls } from "../../apiUrls";
import axiosInstace from "../../utils/interceptor";
import { User } from "../../store/interface/user";

interface SideDrawerForUserSearchProps {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.MutableRefObject<null>;
}

const SideDrawerForUserSearch = (
  props: SideDrawerForUserSearchProps
): JSX.Element => {
  const { isOpen, onClose, btnRef } = props;
  const [searchText, setSearchText] = useState<string>("");

  const [users, setUsers] = useState<Array<User>>([]);

  const toast = useToast();

  const searchUsers = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
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
    try {
      const { data } = await axiosInstace.get(apiUrls.SEARCH_USERS, {
        params: { searchText },
      });
      if (data.data && data.data.length == 0) {
        toast({
          title: "Error",
          description: "No Users found",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-left",
        });
        return;
      } else if (data.data && data.data.length > 0) {
        setUsers(data.data);
      }
    } catch (e) {
      console.error("error occurred while searching users ");
    }
  };

  return (
    <>
      <Drawer
        size={"sm"}
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
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawerForUserSearch;
