// Material Components
import { Box, Typography } from "@mui/material";
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
      <SectionContent contentUrl={props.contentUrl}>
        <Typography variant="h4">{props.chapterTitle}</Typography>
        <Typography variant="h5">{props.title}</Typography>
      </SectionContent>
      {/* <SectionContent></SectionContent> */}
    </SectionPageContainer>
  );
}
