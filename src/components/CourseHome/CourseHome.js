// Material Components
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
// Custom Components
import SideNav from "../SideNav";

const CourseHomeContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  height: "100%",
  width: "100%",
}));

export default function CourseHome() {
  return (
    <CourseHomeContainer>
      <SideNav></SideNav>
    </CourseHomeContainer>
  );
}
