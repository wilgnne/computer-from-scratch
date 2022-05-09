import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider, Flex } from "@chakra-ui/react";

import EmulatorContextProvider from "../context/emulator";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <EmulatorContextProvider>
        <Navbar />
        <Flex flex={1}>
          <Component {...pageProps} />
        </Flex>
      </EmulatorContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
