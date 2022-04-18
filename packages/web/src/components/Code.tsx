import React, { useState } from "react";
import { Button, Divider, Flex, Heading } from "@chakra-ui/react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

import { useEmulator } from "../context/emulator";

function Code() {
  const [code, setCode] = useState("");
  const { assemble, step } = useEmulator();

  const [inverval, setInverval] = useState<any>();

  function handleStart() {
    if (inverval) {
      clearInterval(inverval);
      setInverval(undefined);
      return;
    }

    const intervalId = setInterval(() => {
      step();
      step();
      step();
    }, 1000 / 6);

    setInverval(intervalId);
  }

  return (
    <Flex direction="column" height="100%">
      <Heading size="md">Code</Heading>
      <Divider marginTop={2} marginBottom={2} />
      <AceEditor
        style={{ flex: 1 }}
        width="100%"
        placeholder="Placeholder Text"
        mode="sass"
        theme="github"
        name="blah2"
        onChange={(value) => setCode(value)}
        fontSize={14}
        showPrintMargin
        showGutter
        highlightActiveLine
        value={code}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 4,
        }}
      />
      {/* <Textarea
        flex={1}
        placeholder='Here is a sample placeholder'
        size='sm'
        resize='none'
        height='auto'
        overflow='auto'
        value={code}
        onChange={(e) => handleChange(e)}
      /> */}
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
