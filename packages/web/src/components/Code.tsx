import React, { useEffect, useState } from "react";
import { Button, Divider, Flex, Heading } from "@chakra-ui/react";

import { useEmulator } from "../context/emulator";

import Editor from "./Editor";

function Code() {
  const [code, setCode] = useState("");
  const { assemble, step } = useEmulator();

  const [inverval, setInverval] = useState<any>();
  const [stop, setStop] = useState(false);

  function handleStart() {
    if (inverval) {
      clearInterval(inverval);
      setInverval(undefined);
      return;
    }

    const intervalId = setInterval(() => {
      try {
        step();
      } catch {
        setStop(true);
      }
    }, 1000 / 2);

    setInverval(intervalId);
  }

  useEffect(() => {
    if (stop) {
      clearInterval(inverval);
      setInverval(undefined);
      setStop(false);
    }
  }, [stop]);

  return (
    <Flex direction="column" height="100%">
      <Heading size="md">Code</Heading>
      <Divider marginTop={2} marginBottom={2} />
      <Editor value={code} onChange={(value) => setCode(value)} />
      <Flex marginTop={2} gap={2}>
        <Button variant="outline" onClick={() => assemble(code)}>
          Assemble
        </Button>
        <Button variant="outline" onClick={() => setCode("")}>
          Clear
        </Button>
        <Button onClick={() => step()}>Next Step</Button>
        <Button
          onClick={() => handleStart()}
          colorScheme={inverval ? "red" : "green"}
        >
          {inverval ? "Stop" : "Start"}
        </Button>
      </Flex>
    </Flex>
  );
}

export default Code;
