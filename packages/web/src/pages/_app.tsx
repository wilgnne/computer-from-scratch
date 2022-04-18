import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import EmulatorContextProvider from "../context/emulator";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <EmulatorContextProvider>
        <Component {...pageProps} />
      </EmulatorContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
