import React, { useEffect, useState } from "react";

// Material UI
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// Third Party Imports
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const ContentContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "85vh",
  maxHeight: "calc(100% - 2rem)",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  overflow: "scroll",
  border: "1rem solid white",
  backgroundColor: "white",
  margin: "0.5rem .25rem",
}));

export default function SectionContent(props) {
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

  return (
    <ContentContainer>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        id="markdown"
        children={content}
      />
    </ContentContainer>
  );
}
