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
  height: "calc(100% - 4rem)",
  width: "100%",
}));

const ContentContainer = styled(Box)(() => ({
  width: "100%",
  marginLeft: "12rem",
  height: "100%",
  backgroundColor: "lightblue",
}));

export default function CourseHome() {
  return (
    <CourseHomeContainer>
      <SideNav></SideNav>
      <ContentContainer>
        <Outlet></Outlet>
      </ContentContainer>
    </CourseHomeContainer>
  );
}
