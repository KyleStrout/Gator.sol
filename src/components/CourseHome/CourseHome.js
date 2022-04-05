// React Components
import { Outlet } from "react-router-dom";
import React from "react";
// Material Components
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
// Custom Components
import SideNav from "../SideNav";
// Theme
import { useTheme } from "@mui/styles";

const CourseHomeContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  height: "calc(100vh - 4rem)",
  width: "100%",
}));

const ContentContainer = styled(Box)(() => ({
  width: "100%",
  marginLeft: "12rem",
  height: "calc(100vh - 4rem)",
  flexDirection: "row",
}));

export default function CourseHome() {
  const theme = useTheme();
  return (
    <CourseHomeContainer
      id="course-home-container"
      style={{ backgroundColor: theme.palette.sideNavAccordion }}
    >
      <SideNav id="side-nav"></SideNav>
      <ContentContainer
        id="content-container"
        sx={{
          backgroundColor: theme.palette.backgroundColor,
        }}
      >
        <Outlet></Outlet>
      </ContentContainer>
    </CourseHomeContainer>
  );
}
