import { Avatar, Box, Card, Text, background } from "@chakra-ui/react";
import * as React from "react";
import { User } from "../../store/interface/user";

const UserCard = ({ user }: { user: User }) => {
  return (
    <Card
      boxShadow={"0px 0px 5px grey"}
      display={"flex"}
      flexDirection={"row"}
      gap="10px"
      mt="10px"
      alignItems={"center"}
        padding={"10px"}
      _hover={{ background: "darkcyan", cursor: "pointer", color: "white" }}
    >
      <Box>
        <Avatar size="sm" src={user.profilePicture} />
      </Box>
      <Box>
        <Text fontSize="14px">{user.name}</Text>
        <Text fontSize={"12px"}>
          <Text as="b">Email: </Text>
          {user.email}
        </Text>
      </Box>
    </Card>
  );
};

export default UserCard;
