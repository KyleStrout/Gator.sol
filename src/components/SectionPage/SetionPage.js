// Material Components
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom Components
import SectionContent from "../SectionContent";
// import SectionInteraction from "../SectionInteraction";

const SectionPageContainer = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  height: "100%",
}));

export default function SectionPage(props) {
  return (
    <SectionPageContainer>
      <SectionContent contentUrl={props.contentUrl}></SectionContent>
      {/* <SectionContent></SectionContent> */}
    </SectionPageContainer>
  );
}
