import React, { useEffect, useState } from "react";

// Material UI
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// Third Party Imports
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Prism from "prismjs";
import "./prism.css";
import rehypePrism from "@mapbox/rehype-prism";

// Theme
import { useTheme } from "@mui/styles";

const ContentContainer = styled(Box)(() => ({
  //display: "flex",
  //flexDirection: "column",
  width: "100%",
  height: "calc(100vh - 5rem)",
  //justifyContent: "flex-start",
  //alignItems: "flex-start",
  overflow: "scroll",
  backgroundColor: "white",
  padding: "0 .5rem",
  border: "0.5rem solid #f0f0f0",
  borderRight: "0",
  fontFamily: "Lato",
}));

const Content = styled(Box)(() => ({
  maxWidth: "750px",
  margin: "auto",
}));

export default function SectionContent(props) {
  const [content, setContent] = useState("");
  const theme = useTheme();
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
      sx={{
        backgroundColor: theme.palette.backgroundColor,
        color: theme.palette.textColor,
        border: theme.palette.border,
      }}
    >
      <Content>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypePrism]}
          id="markdown"
          children={content}
        />
      </Content>
    </ContentContainer>
  );
}
