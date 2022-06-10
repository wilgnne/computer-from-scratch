import React from "react";
import { Divider, Flex, Heading } from "@chakra-ui/react";

import Editor from "./Editor";

interface Props {
  value: string;
}

function PreprocessedAssemblyViewer({ value }: Props) {
  return (
    <Flex direction="column" height="100%">
      <Heading size="md">Pre-processed Assembly Viewer</Heading>
      <Divider marginTop={2} marginBottom={2} />
      <Editor value={value} readOnly />
    </Flex>
  );
}

export default PreprocessedAssemblyViewer;
