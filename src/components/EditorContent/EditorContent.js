import React, { useEffect, useState } from "react";
import CodeEditor from "../CodeEditor";

// Material UI
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

function EditorContent(props) {
  const [content, setContent] = useState("");

  useEffect(() => {
    async function loadData() {
      if (!props.contentUrl) {
        setContent("");
      } else {
        const data = await import(`../../data/content/${props.contentUrl}`);
        setContent(data?.default);
      }
    }
    loadData();
  }, [props.contentUrl]);

  return <CodeEditor />;
}

export default EditorContent;
