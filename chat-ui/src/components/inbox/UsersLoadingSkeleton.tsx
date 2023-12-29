import { Skeleton } from "@chakra-ui/react";
import * as React from "react";

const UsersLoadingSkeleton = () => {
  return (
    <>
      {Array(8)
        .fill("")
        .map((_, idx: number) => {
          return (
            <Skeleton
              mt="10px"
              padding={"30px"}
              borderRadius={"5px"}
              key={idx}
              height="20px"
            />
          );
        })}
    </>
  );
};

export default UsersLoadingSkeleton;
