import * as React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

const LoginTabs = () => {
  return (
    <>
      <Box width={592}>
        <Tabs
          variant="soft-rounded"
          width={"100%"}
          mt="100px"
          borderRadius={10}
          paddingX="30"
          bg={"white"}
          paddingY={"20px"}
        >
          <TabList>
            <Tab width={"100%"}>Sign In</Tab>
            <Tab width={"100%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SignIn />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default LoginTabs;
