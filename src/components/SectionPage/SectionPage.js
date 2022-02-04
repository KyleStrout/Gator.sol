// Material Components
import { Box, Hidden } from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom Components
import SectionContent from "../SectionContent";
import SectionInteraction from "../SectionInteraction";
const SectionPageContainer = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  height: "100%",
  alignItems: "start",
  overflow: "hidden",
}));

export default function SectionPage(props) {
  return (
    <SectionPageContainer>
      <SectionContent contentUrl={props.contentUrl}></SectionContent>
      <SectionInteraction
        hasCodeEditor={props.hasCodeEditor}
        defaultCode={props.defaultCode}
      ></SectionInteraction>
    </SectionPageContainer>
  );
}
