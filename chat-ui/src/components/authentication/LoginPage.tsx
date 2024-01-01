import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import * as React from "react";
import LoginTabs from "./LoginTabs";
import { useNavigate } from "react-router-dom";
import { userProvider } from "../../store/provider/userProvider";

const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      localStorage.getItem("authToken") &&
      localStorage.getItem("userDetails")
    ) {
      const { setUserDetails } = userProvider();
      setUserDetails(JSON.parse(localStorage.getItem("userDetails") || ""));
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
