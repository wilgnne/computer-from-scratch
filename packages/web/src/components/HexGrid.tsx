import React from "react";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { number2hex } from "../utils/convert";

interface Props {
  data: any[][];
  lineLength: number;
}

function HexGrid({ data, lineLength }: Props) {
  return (
    <Box bg="gray.200" borderRadius={2}>
      {data.map((row, rowIndex) => (
        <Flex key={rowIndex}>
          {[...row, ...Array(lineLength - row.length).fill(0)].map(
            (value, colIndex) => (
              <Center key={colIndex} w="100%" h="100%" borderRadius={4}>
                <Text fontSize="sm">{number2hex(value).toUpperCase()}</Text>
              </Center>
            )
          )}
        </Flex>
      ))}
    </Box>
  );
}

export default HexGrid;
