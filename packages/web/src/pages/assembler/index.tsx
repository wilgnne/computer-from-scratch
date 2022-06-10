import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useState, useCallback } from "react";

import { asm, preprocessor } from "@computer-from-scratch/assembler";
import { Assembler } from "@computer-from-scratch/common";

import Labels from "../../components/labels";
import HexGrid from "../../components/HexGrid";
import { chunkArray } from "../../utils/chunk";
import { useEmulator } from "../../context/emulator";

const AssemblyEditor = dynamic(
  () => import("../../components/AssemblyEditor"),
  { ssr: false }
);
const PreProcessedAssemblyViwer = dynamic(
  () => import("../../components/PreProcessedAssemblyViwer"),
  { ssr: false }
);

function AssemblerPage() {
  const { assemble: build } = useEmulator();

  const [preprocessedCode, setPreprocessedCode] = useState("");
  const [preprocessedCodeLabels, setPreprocessedCodeLabels] =
    useState<Record<string, Assembler.Label>>();
  const [labels, setLabels] = useState<Record<string, Assembler.Label>>();
  const [program, setProgram] = useState<number[]>([]);

  const toast = useToast();

  const assemble = useCallback((code: string) => {
    try {
      const preprocessed = preprocessor(code);
      setPreprocessedCode(preprocessed.code);
      setPreprocessedCodeLabels(preprocessed.labels);

      const { code: machineCode, labels: programLabels } = asm(
        preprocessed.code
      );

      setPreprocessedCode(preprocessed.code);
      setProgram(machineCode);
      setLabels(programLabels);

      build(preprocessed.code);
    } catch (e) {
      toast({
        title: "Compile Error",
        description: e.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, []);

  return (
    <Flex flex={1} p={8} gap={6}>
      <Flex flex={1} direction="column" gap={6}>
        <Box flex={1} borderWidth={1} borderRadius={6} p={2}>
          <AssemblyEditor onAssemble={(code) => assemble(code)} />
        </Box>
        <Box borderWidth={1} borderRadius={6} p={2}>
          <Labels labels={preprocessedCodeLabels} />
        </Box>
      </Flex>

      <Flex flex={1} direction="column" gap={6}>
        <Box flex={1} borderWidth={1} borderRadius={6} p={2}>
          <PreProcessedAssemblyViwer value={preprocessedCode} />
        </Box>
        <Box borderWidth={1} borderRadius={6} p={2}>
          <Labels labels={labels} />
        </Box>
      </Flex>

      <Flex flex={1} direction="column" gap={6}>
        <Box flex={1} borderWidth={1} borderRadius={6} p={2}>
          <Flex justifyContent="space-between">
            <Heading size="md">Machine Code</Heading>
            <Stack spacing={4} direction="row" align="center">
              <Button
                colorScheme="teal"
                variant="outline"
                size="xs"
                disabled={program.length === 0}
                onClick={() =>
                  navigator.clipboard.writeText(JSON.stringify(program))
                }
              >
                Copy
              </Button>
              <Button
                colorScheme="teal"
                size="xs"
                disabled={program.length === 0}
              >
                Download
              </Button>
            </Stack>
          </Flex>

          <Divider marginTop={2} marginBottom={2} />
          <Box overflowY="auto">
            <HexGrid data={chunkArray(program, 16)} lineLength={16} />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default AssemblerPage;
