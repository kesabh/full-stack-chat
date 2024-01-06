import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import ChatsList from "./ChatsList";
import ChatBox from "./ChatBox";
import { Grid, GridItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { apiUrls } from "../../apiUrls";
import axiosInstace from "../../utils/interceptor";
import { chatsListProvider } from "../../store/provider/chatsListProvider";
import { useAppSelector } from "../../store/hooks";
import { Chat, Message } from "../../store/interface/chat";
import { User } from "../../store/interface/user";
import { getStore } from "../../store/store";
import { socket } from "../../socket";
import { initialActiveChatState } from "../../store/reducers/activeChatSlice";
import { activeChatProvider } from "../../store/provider/activeChatProvider";
import { userTyping } from "./interface/chatBox";
import { notificationsProvider } from "../../store/provider/notificationsProvider";

const InboxPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [msgsLoading, setMsgsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userTypingLoader, setUserTypingLoader] = useState<userTyping>({
    isTyping: false,
    name: "",
  });
  const bottomDivRef = useRef(null);

  const activeChat = useAppSelector((state) => state.activeChat);
  const userFromStore = useAppSelector((state) => state.user);

  const { setActiveChat } = activeChatProvider();
  const { updateNotifications } = notificationsProvider();

  const sendMessage = async (content: string): Promise<void> => {
    const payload = {
      content,
      chatId: activeChat._id,
      sender: userFromStore.userId,
    };
    setMessages([
      ...messages,
      { ...payload, sender: { ...userFromStore, _id: userFromStore.userId } },
    ]);
    axiosInstace.post(apiUrls.SEND_MESSAGE, payload);
    const receivers = activeChat.users
      .filter((user: User) => user.userId !== userFromStore.userId)
      .map((user: User) => user.userId);

    socket.emit("send_message", {
      message: {
        ...payload,
        sender: userFromStore,
        chatName: activeChat.chatName,
      },
      receivers,
    });

    socket.emit("stop_typing", {
      chatId: activeChat._id,
      userFromStore,
      receivers,
    });

    setUserTypingLoader({ isTyping: false, name: "" });
  };

  const fetchMessagesForActiveChat = async (): Promise<void> => {
    try {
      setMsgsLoading(true);
      const { data } = await axiosInstace.get(apiUrls.GET_MESSAGES, {
        params: { chatId: getStore().state.activeChat._id },
      });
      if (data.data && data.success) {
        setMessages(data.data);
      }
    } catch (e) {
      console.error("error occurred while fetching messages", e);
    } finally {
      setMsgsLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
      return;
    }

    const fetchAllChats = async (): Promise<void> => {
      try {
        setLoading(true);
        const { setChatsList } = chatsListProvider();
        const { data } = await axiosInstace.get(apiUrls.FETCH_ALL_CHATS);
        if (data.data && data.success) {
          const chats = data.data;
          chats.forEach((chat: Chat) => {
            if (!chat.isGroupChat) {
              chat.users.forEach((user: User) => {
                if (user.userId !== userFromStore.userId)
                  chat.chatName = user.name;
              });
            }
          });
          setChatsList(chats);
        }
      } catch (e) {
        console.error("error while fetching chats", e);
      } finally {
        setLoading(false);
      }
    };
    fetchAllChats();
    setActiveChat(initialActiveChatState);
  }, []);

  useEffect(() => {
    bottomDivRef &&
      bottomDivRef.current &&
      (bottomDivRef.current as HTMLDivElement).scrollIntoView({
        behavior: "smooth",
      });
  });

  // connect a socket with server
  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      socket.emit("join_room", userFromStore.userId);

      socket.on("receive_message", (data) => {
        console.log("msg recerived", data);
        const activeChat = getStore().state.activeChat;

        if (data.chatId === activeChat._id)
          setMessages((prev) => [...prev, data]);
        else {
          updateNotifications({ chatName: data.chatName, chatId: data.chatId });
        }
      });

      socket.on("show_loader_for_user_typing", (data) => {
        const activeChat = getStore().state.activeChat;

        if (data.chatId === activeChat._id) {
          setUserTypingLoader({
            isTyping: true,
            name: data.userFromStore.name,
          });
        }
      });

      socket.on("hide_loader_for_stopped_typing", (data) => {
        const activeChat = getStore().state.activeChat;

        if (data.chatId === activeChat._id) {
          setUserTypingLoader({ isTyping: false, name: "" });
        }
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Header fetchMessagesForActiveChat={fetchMessagesForActiveChat}></Header>
      <Grid
        templateColumns="repeat(8, 1fr)"
        gap={"20px"}
        padding={"20px"}
        h="calc(100vh - 60px)"
      >
        <GridItem
          bg={"white"}
          colSpan={2}
          borderRadius={"5px"}
          minH={"100%"}
          overflow={"scroll"}
        >
          <ChatsList
            fetchMessagesForActiveChat={fetchMessagesForActiveChat}
            loading={loading}
          />
        </GridItem>
        <GridItem bg={"white"} colSpan={6} borderRadius={"5px"} minH="100%">
          <ChatBox
            loading={msgsLoading}
            bottomDivRef={bottomDivRef}
            messages={messages}
            sendMessage={sendMessage}
            userTypingLoader={userTypingLoader}
            setUserTypingLoader={setUserTypingLoader}
          />
        </GridItem>
      </Grid>
    </>
  );
};

export default InboxPage;
