import * as React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const LoginTabs = () => {
  return (
    <>
      <Box width={592}>
        <Tabs
          variant="soft-rounded"
          width={"100%"}
          mt="20px"
          borderRadius={10}
          paddingX="30px"
          bg={"white"}
          paddingY="40px"
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
