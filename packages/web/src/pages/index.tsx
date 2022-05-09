import React from "react";
import { Flex, Heading, Divider, Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

import Labels from "../components/labels";
import Registers from "../components/Registers";
import Memory from "../components/Memory";

const Code = dynamic(() => import("../components/Code"), { ssr: false });
const Display = dynamic(() => import("../components/Display"), { ssr: false });

function App() {
  return (
    <Flex flex={1} h="100%" padding={8} gap={6}>
      <Flex flex={1} direction="column" gap={6}>
        <Box flex={1} borderWidth={1} borderRadius={6} padding={2}>
          <Code />
        </Box>
        <Box borderWidth={1} borderRadius={6} padding={2}>
          <Labels />
        </Box>
      </Flex>

      <Flex direction="column" gap={6}>
        <Box borderWidth={1} borderRadius={6} padding={2}>
          <Display />
        </Box>
        <Box borderWidth={1} borderRadius={6} padding={2}>
          <Heading size="md">CPU & Memory</Heading>
          <Divider marginTop={2} marginBottom={2} />
          <Registers />
          <Memory />
        </Box>
      </Flex>
    </Flex>
  );
}

export default App;
