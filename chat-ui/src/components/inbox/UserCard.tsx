import { Avatar, Box, Card, Text } from "@chakra-ui/react";
import * as React from "react";
import { User } from "../../store/interface/user";

interface UserCardProps {
  user: User;
  onCardClick?: (
    event: React.MouseEvent<HTMLElement>,
    userDetails: User
  ) => Promise<void> | void;
}

const UserCard = (props: UserCardProps): JSX.Element => {
  const { user, onCardClick } = props;

  return (
    <Card
      boxShadow={"0px 0px 5px grey"}
      display={"flex"}
      flexDirection={"row"}
      gap="10px"
      mt="10px"
      alignItems={"center"}
      padding={"10px"}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        onCardClick && onCardClick(e, user);
      }}
      _hover={{ background: "darkcyan", cursor: "pointer", color: "white" }}
    >
      <Box>
        <Avatar size="sm" src={user.profilePicture || ""} />
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
