import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function SectionContent(props) {
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log("setting content");
    async function loadData() {
      if (!props.contentUrl) {
        setContent("");
      } else {
        const data = await import(`../../data/content/${props.contentUrl}`);
        console.log(typeof data.default);
        setContent(data.default);
      }
    }

    loadData();
  }, [props.contentUrl]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      width="100%"
      height="fit-content"
      maxHeight="calc(100% - 2rem)"
      overflow="scroll"
      sx={{
        border: "1px solid black",
        padding: "1rem",
        margin: "0.5rem 1rem",
      }}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        id="markdown"
        children={content}
      />
    </Box>
  );
}
