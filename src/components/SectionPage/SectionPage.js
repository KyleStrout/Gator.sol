// Material Components
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom Components
import SectionContent from "../SectionContent";
import SectionInteraction from "../SectionInteraction";
const SectionPageContainer = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  height: "calc(100vh - 4rem)",
  justifyContent: "center",
  alignItems: "start",
  overflow: "hidden",
}));

export default function SectionPage(props) {
  return (
    <SectionPageContainer id="section-page-container">
      <SectionContent
        id="section-content"
        contentUrl={props.contentUrl}
      ></SectionContent>
      {props.hasCodeEditor && (
        <SectionInteraction
          id="section-interaction"
          hasCodeEditor={props.hasCodeEditor}
          defaultCode={props.defaultCode}
        ></SectionInteraction>
      )}
    </SectionPageContainer>
  );
}
