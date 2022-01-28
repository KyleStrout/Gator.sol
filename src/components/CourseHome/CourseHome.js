// React Components
import { Routes, Route } from "react-router-dom";

// Material Components
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
// Custom Components
import SideNav from "../SideNav";
import CoursePage from "../CoursePage";

const CourseHomeContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  height: "100%",
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
        <Routes>
          <Route path="/course/blockchain" element={<CoursePage />}></Route>
        </Routes>
      </ContentContainer>
    </CourseHomeContainer>
  );
}
