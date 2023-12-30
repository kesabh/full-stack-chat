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
import { useNavigate } from "react-router-dom";
import SideDrawerForUserSearch from "../inbox/SideDrawerForUserSearch";

const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      localStorage.getItem("authToken") &&
      localStorage.getItem("userDetails")
    ) {
      navigate("/inbox");
    }
  }, []);

  return (
    <>
      <Grid templateColumns="1">
        <GridItem display={"flex"} justifyContent={"center"}>
          <Box
            borderRadius={10}
            mt={50}
            h="100px"
            width={592}
            bg={"white"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Heading as="h2"> Convo Connect </Heading>
          </Box>
        </GridItem>
        <GridItem
          display="flex"
          justifyContent="center"
          // h="calc(100vh - 100px )"
        >
          <LoginTabs></LoginTabs>
        </GridItem>
      </Grid>
    </>
  );
};

export default LoginPage;
