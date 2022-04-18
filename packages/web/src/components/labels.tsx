import React from "react";
import {
  Divider,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { useEmulator } from "../context/emulator";

function Labels() {
  const { labels } = useEmulator();

  return (
    <>
      <Heading size="md">Labels</Heading>
      <Divider marginTop={2} marginBottom={2} />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Adrres</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(labels || {}).map((name) => (
              <Tr key={name}>
                <Td>{name}</Td>
                <Td>{labels[name].address}</Td>
                <Td>{`${labels[name].value.number
                  .toString(16)
                  .toUpperCase()}('${labels[name].value.char}')`}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Labels;
