import React from "react";
import {
  Box,
  Center,
  Divider,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import { Registers } from "@computer-from-scratch/common";

import { useEmulator } from "../context/emulator";
import { chunkArray } from "../utils/chunk";

function Memory() {
  const { memory, registers } = useEmulator();

  const position = Object.keys(registers).reduce((prev, curr) => {
    const value = registers[curr];
    return {
      ...prev,
      [value]: curr,
    };
  }, {});

  const memoryRows = chunkArray(memory.getMemory(), 256);

  return (
    <>
      <Text size="md" marginTop={2}>
        RAM
      </Text>
      <Divider marginTop={2} marginBottom={2} />
      <Tabs>
        <TabList>
          {memoryRows.map((_row, index) => (
            <Tab key={`${index}`}>{index}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {memoryRows.map((page, pageIndex) => {
            const rows = chunkArray(page, 16);
            return (
              <TabPanel key={pageIndex}>
                <Box bg="gray.200" borderRadius={2}>
                  {rows.map((row, rowIndex) => (
                    <Flex key={rowIndex} justifyContent="flex-start">
                      {row.map((value, colIndex) => {
                        const index =
                          pageIndex * 256 + rowIndex * 16 + colIndex;
                        const reg = position[index];
                        return (
                          <Center
                            key={colIndex}
                            w="100%"
                            h="100%"
                            bg={
                              reg ? Registers.RegistersColors[reg] : undefined
                            }
                            borderRadius={4}
                          >
                            <Text fontSize="sm">
                              {value.toString(16).toUpperCase()}
                            </Text>
                          </Center>
                        );
                      })}
                    </Flex>
                  ))}
                </Box>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </>
  );
}

export default Memory;
