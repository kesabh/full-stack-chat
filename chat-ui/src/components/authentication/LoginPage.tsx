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
  FormErrorMessage,
  FormHelperText,
  TabPanel,
} from "@chakra-ui/react";
import * as React from "react";
import LoginTabs from "./LoginTabs";

const LoginPage = (): JSX.Element => {
  return (
    <>
      <Grid templateColumns="1" h={"100vh"}>
        <GridItem h="100px" bg="blue.500">
          <Box
            h={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Heading as="h2"> Sandesh Vahak </Heading>
          </Box>
        </GridItem>
        <GridItem
          display="flex"
          justifyContent="center"
          h="calc(100vh - 100px )"
          bg="green.100"
        >
          <LoginTabs></LoginTabs>
        </GridItem>
      </Grid>
    </>
  );
};

export default LoginPage;
