import React from "react";
import AceEditor, { IMarker } from "react-ace";

import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

interface Props {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  markers?: IMarker[];
}

function Editor({ onChange, value, readOnly, markers }: Props) {
  return (
    <AceEditor
      style={{ flex: 1 }}
      width="100%"
      placeholder="Placeholder Text"
      mode="sass"
      theme="github"
      name="blah2"
      onChange={onChange}
      fontSize={14}
      showPrintMargin
      showGutter
      highlightActiveLine
      value={value}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 4,
      }}
      readOnly={readOnly}
      markers={markers}
    />
  );
}

export default Editor;
