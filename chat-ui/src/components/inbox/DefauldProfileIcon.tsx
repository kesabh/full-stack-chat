import { Image } from "@chakra-ui/react";
import * as React from "react";

const DefaultProfileIcon = () => {
  return (
    <Image
      objectFit="cover"
      borderRadius="full"
      boxSize={"100%"}
      width={"25px"}
      height={"25px"}
      src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
      alt="Profile Picture"
    />
  );
};

export default DefaultProfileIcon;
