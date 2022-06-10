import React, { useState } from "react";
import { Button, Divider, Flex, Heading } from "@chakra-ui/react";

import Editor from "./Editor";

interface Props {
  onAssemble: (code: string) => void;
}

function AssemblyEditor({ onAssemble }: Props) {
  const [code, setCode] = useState("");

  return (
    <Flex direction="column" height="100%">
      <Heading size="md">Assembly Editor</Heading>
      <Divider marginTop={2} marginBottom={2} />
      <Editor value={code} onChange={(value) => setCode(value)} />
      <Flex marginTop={2} gap={2}>
        <Button variant="outline" onClick={() => onAssemble(code)}>
          Assemble
        </Button>
        <Button variant="outline" onClick={() => setCode("")}>
          Clear
        </Button>
      </Flex>
    </Flex>
  );
}

export default AssemblyEditor;
