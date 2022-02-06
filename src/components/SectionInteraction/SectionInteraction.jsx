// Material UI Components
import { Box } from "@mui/material";
import { styled } from "@mui/styles";

// Custom Components
import CodeEditor from "../CodeEditor";

const SectionInteractionContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "calc(100vh - 4rem)",
}));

function SectionInteractionContent(props) {
  if (props.hasCodeEditor) {
    return (
      <Box height="100%">
        <CodeEditor defaultCode={props.defaultCode} />
        <Box
          sx={{
            height: "calc(50vh - 2rem)",
            backgroundColor: "white",
          }}
        >
          output goes here
        </Box>
      </Box>
    );
  } else {
    return (
      <Box>
        <h1>Section Interaction</h1>
      </Box>
    );
  }
}

export default function SectionInteraction(props) {
  return (
    <SectionInteractionContainer id="section-interaction-conatainer">
      <SectionInteractionContent
        hasCodeEditor={props.hasCodeEditor}
        defaultCode={props.defaultCode}
      ></SectionInteractionContent>
    </SectionInteractionContainer>
  );
}
