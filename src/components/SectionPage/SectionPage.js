// Material Components
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";

// Custom Components
import SectionContent from "../SectionContent";
// import SectionInteraction from "../SectionInteraction";
import EditorContent from "../EditorContent";
import CodeEditor from "../CodeEditor";

const SectionPageContainer = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  height: "100%",
  alignItems: "start",
}));

const eb2 = styled(Box)(() => ({
  paddingTop: "8px",
  marginLeft: "-40px",
}));
//<EditorContent></EditorContent>

export default function SectionPage(props) {
  // async would be good here
  const defaultCode = props.defaultCode;

  function EditorBox(props) {
    if (props.hasCodeEditor) {
      return (
        <Box sx={{ paddingTop: "8px", marginLeft: "-40px" }}>
          <CodeEditor defaultCode={defaultCode} />
        </Box>
      );
    } else {
      return <Box></Box>;
    }
  }

  return (
    <SectionPageContainer>
      <SectionContent
        contentUrl={props.contentUrl}
        hasCodeEditor={props.hasCodeEditor}
      ></SectionContent>
      <EditorBox hasCodeEditor={props.hasCodeEditor}></EditorBox>

      {/* <SectionContent></SectionContent> */}
    </SectionPageContainer>
  );
}
