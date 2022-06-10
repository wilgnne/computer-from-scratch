import React from "react";
import { Box, Heading, HStack, Button } from "@chakra-ui/react";

import { RouteNames, useNavigator } from "../context/navigation";

const Links: RouteNames[] = ["Assembler", "Emulator"];

function Navbar() {
  const { navigate } = useNavigator();

  return (
    <Box display="flex" justifyContent="space-around" bg="blue.600" p={2}>
      <Heading color="white" size="lg">
        🖥️ CFS - Computer from Scratch
      </Heading>
      <Box textColor="white" alignSelf="center">
        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((name) => (
              <Button
                key={name}
                size="md"
                colorScheme="blue"
                textColor="white"
                variant="link"
                onClick={() => navigate(name)}
              >
                {name}
              </Button>
            ))}
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
}

export default Navbar;
