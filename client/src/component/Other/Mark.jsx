import logo from "./logo.svg";
import "./App.css";

import MarkdownEditor from "@uiw/react-markdown-editor";
import React, { useState } from "react";

function App() {
  const [markdown, setMarkdown] = useState("");
  return (
    <>
      <MarkdownEditor
        height={700}
        tabSize={4}
        visible={true}
        value={markdown}
        onChange={(editor, data, value) => setMarkdown(value)}
      />
    </>
  );
}

export default App;
