// Material Components
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const SectionPageContainer = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  height: "100%",
}));

export default function SectionPage(props) {
  return (
    <SectionPageContainer>
      <Typography variant="h1">{props.title}</Typography>
    </SectionPageContainer>
  );
}
