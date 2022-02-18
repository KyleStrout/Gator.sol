// React Components
import { Outlet } from "react-router-dom";

// Material Components
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
// Custom Components
import SideNav from "../SideNav";

const CourseHomeContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  height: "calc(100vh - 4rem)",
  width: "100%",
  //set background color to grey
  backgroundColor: "gray"
}));

const ContentContainer = styled(Box)(() => ({
  width: "100%",
  marginLeft: "12rem",
  height: "calc(100vh - 4rem)",
  backgroundColor: "gray",
  flexDirection: "row",
}));

export default function CourseHome() {
  return (
    <CourseHomeContainer id="course-home-container">
      <SideNav id="side-nav"></SideNav>
      <ContentContainer id="content-container">
        <Outlet></Outlet>
      </ContentContainer>
    </CourseHomeContainer>
  );
}
