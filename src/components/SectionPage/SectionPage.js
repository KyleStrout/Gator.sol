// Material Components
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom Components
import SectionContent from "../SectionContent";
import CodeEditor from "../CodeEditor";

const SectionPageContainer = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  height: "100%",
  alignItems: "start",
}));

export default function SectionPage(props) {
  // async would be good here
  const defaultCode = props.defaultCode;

  function EditorBox(props) {
    if (props.hasCodeEditor) {
      return (
        <Box sx={{ paddingTop: "8px", marginLeft: "0" }}>
          <CodeEditor defaultCode={defaultCode} />
        </Box>
      );
    } else {
      return <Box></Box>;
    }
  }

  return (
    <SectionPageContainer>
      <SectionContent contentUrl={props.contentUrl}></SectionContent>
      <EditorBox hasCodeEditor={props.hasCodeEditor}></EditorBox>

      {/* <SectionContent></SectionContent> */}
    </SectionPageContainer>
  );
}
