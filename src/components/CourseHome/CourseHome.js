// React Components
import { Outlet } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
// Material Components
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
// Custom Components
import SideNav from "../SideNav";
import {ThemeContext, themes} from '../ThemeContext';

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
  const { customTheme, setCustomTheme } = React.useContext(ThemeContext)
  return (
    <CourseHomeContainer id="course-home-container" backgroundColor = {customTheme.backgroundColor}>
      <SideNav id="side-nav"></SideNav>
      <ContentContainer id="content-container">
        <Outlet></Outlet>
      </ContentContainer>
    </CourseHomeContainer>
  );
}
