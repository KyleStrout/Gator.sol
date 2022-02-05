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
  height: "fit-content",
  maxHeight: "calc(100% - 2rem)",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  overflow: "scroll",
  border: "1px solid black",
  padding: "1rem",
  marginTop: "0.5rem",
  marginBottom: "0.5rem",
  marginRight: "0rem",
  marginLeft: "1rem",
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
