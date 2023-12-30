import React, { useEffect, useState } from "react";
import Header from "./Header";
import ChatsList from "./ChatsList";
import ChatBox from "./ChatBox";
import { Grid, GridItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { apiUrls } from "../../apiUrls";
import axiosInstace from "../../utils/interceptor";
import { chatsListProvider } from "../../store/provider/chatsListProvider";

const InboxPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!localStorage.getItem("authToken")) navigate("/login");

    try {
      setLoading(true);
      const fetchAllChats = async (): Promise<void> => {
        const { setChatsList } = chatsListProvider();
        const { data } = await axiosInstace.get(apiUrls.FETCH_ALL_CHATS);
        if (data.data && data.success) {
          setChatsList(data.data);
        }
      };

      fetchAllChats();
    } catch (e) {
      console.error("error while fetching chats", e);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Header></Header>
      <Grid
        templateColumns="repeat(7, 1fr)"
        gap={"20px"}
        padding={"20px"}
        h="calc(100vh - 50px)"
      >
        <GridItem
          bg={"white"}
          colSpan={2}
          borderRadius={"5px"}
          minH={"100%"}
          overflow={"scroll"}
        >
          <ChatsList loading={loading} />
        </GridItem>
        <GridItem bg={"white"} colSpan={5} borderRadius={"5px"} minH="100%">
          <ChatBox />
        </GridItem>
      </Grid>
    </>
  );
};

export default InboxPage;
