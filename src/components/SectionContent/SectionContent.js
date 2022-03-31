import React, { useEffect, useState } from "react";

// Material UI
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// Third Party Imports
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import {ThemeContext, themes} from '../ThemeContext';

const ContentContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "calc(100vh - 5rem)",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  overflow: "overlay",
  backgroundColor: "white",
  padding: "0 .5rem",
  border: "0.5rem solid #f0f0f0",
  borderRight: "0",
}));

export default function SectionContent(props) {
  const [content, setContent] = useState("");
  const { customTheme, setCustomTheme } = React.useContext(ThemeContext)
  useEffect(() => {
    async function loadData() {
      if (!props.contentUrl) {
        setContent("");
      } else {
        const data = await import(`../../data/content/${props.contentUrl}`);
        setContent(data?.content);
        const setupFn = data?.setupFn;
        if (setupFn) {
          setupFn();
        }
      }
    }
    loadData();
  }, [props.contentUrl]);

  return (
    <ContentContainer
     id="content-container"
      sx={{backgroundColor: customTheme.backgroundColor, 
      color: customTheme.textColor,
      border: customTheme.border}}
      >
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        id="markdown"
        children={content}
      />
    </ContentContainer>
  );
}
