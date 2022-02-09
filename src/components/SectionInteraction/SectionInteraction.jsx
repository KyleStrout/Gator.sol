// react
import { useEffect, useState } from "react";

// Material UI Components
import { Box } from "@mui/material";
import { styled } from "@mui/styles";

// Custom Components
import CodeEditor from "../CodeEditor";
import OutputPanel from "../OutputPanel";

const SectionInteractionContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "calc(100vh - 5rem)",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  backgroundColor: "white",
  border: "0.5rem solid #f0f0f0",
}));

function SectionInteractionContent(props) {
  const [output, setOutput] = useState({});

  useEffect(() => {
    // clear output
    setOutput({});
    // TODO: if contract was previously deployed, get the previous output ( might have to store things to a db for this)
  }, [props.defaultCode]);

  if (props.hasCodeEditor) {
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <CodeEditor defaultCode={props.defaultCode} onCompile={setOutput} />
        <Box
          sx={{
            height: "calc(50vh - 3.5rem)",
            width: "100%",
            backgroundColor: "white",
            borderBottom: "0.5rem solid #f0f0f0",
          }}
        >
          <OutputPanel output={output}></OutputPanel>
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
        id="section-interaction-content"
        hasCodeEditor={props.hasCodeEditor}
        defaultCode={props.defaultCode}
      ></SectionInteractionContent>
    </SectionInteractionContainer>
  );
}
