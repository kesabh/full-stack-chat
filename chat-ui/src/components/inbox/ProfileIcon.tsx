import { Image } from "@chakra-ui/react";
import * as React from "react";
import { useAppSelector } from "../../store/hooks";
import { User } from "../../store/interface/user";

const ProfileIcon = () => {
  const userDetails: User = useAppSelector((state) => state.user);

  return (
    <Image
      objectFit="cover"
      borderRadius="full"
      boxSize={"100%"}
      width={"25px"}
      height={"25px"}
      src={
        userDetails.profilePicture ||
        "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
      }
      alt="Profile Picture"
    />
  );
};

export default ProfileIcon;
