import React from "react";
import {
  Divider,
  Text,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Center,
} from "@chakra-ui/react";

import { Registers as CommonRegister } from "@computer-from-scratch/common";

import { useEmulator } from "../context/emulator";

function Registers() {
  const { registers } = useEmulator();

  const registersNames = Object.keys(registers);

  return (
    <>
      <Text size="md">Registers / Flags</Text>
      <Divider marginTop={2} marginBottom={2} />
      <TableContainer>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              {registersNames.map((name) => (
                <Th key={name}>{name}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              {registersNames.map((name) => (
                <Td key={name}>
                  <Center
                    bg={CommonRegister.RegistersColors[name] || undefined}
                    borderRadius={4}
                  >
                    {registers[name].toString(16).toUpperCase()}
                  </Center>
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Registers;
