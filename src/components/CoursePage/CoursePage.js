// Material Components
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const CoursePageContainer = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  height: "100%",
}));

export default function CoursePage(props) {
  return (
    <CoursePageContainer>
      <Typography variant="h1">{props.title}</Typography>
    </CoursePageContainer>
  );
}
