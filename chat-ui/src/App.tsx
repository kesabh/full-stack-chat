import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./components/authentication/LoginPage";
import InboxPage from "./components/inbox/InboxPage";
import { useAxiosInterceptor } from "./utils/interceptor";
import { Provider } from "react-redux";
import { persistor, reduxStore } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";

const App = (): JSX.Element => {
  useAxiosInterceptor();

  return (
    <>
      <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider>
            <Router>
              <Routes>
                <Route path="/" element={<LoginPage />}></Route>
                <Route path="/inbox" element={<InboxPage />}></Route>
              </Routes>
            </Router>
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
