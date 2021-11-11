import React from "react";

import MarkdownPreview from "@uiw/react-markdown-preview";

function MarkdownRender({ source }) {
  return <MarkdownPreview source={source} />;
}

export default MarkdownRender;
