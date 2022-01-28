import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import SectionList from "../SectionList";
import course from "../../data/course.js";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.75rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  borderTop: "1px solid rgba(0, 0, 0, .42)",
}));

export default function SideNavAccordion() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (_, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // set expanded to chapter 1 on load
  React.useEffect(() => {
    setExpanded(course.chapters[0].url);
  }, []);

  return (
    <div>
      {course.chapters.map((chapter, index) => (
        <Accordion
          expanded={expanded === chapter.url}
          onChange={handleChange(chapter.url)}
        >
          <AccordionSummary
            aria-controls={`${chapter.title}-content`}
            id={`${chapter.title}-header`}
          >
            <Typography fontSize={"0.75rem"}>{chapter.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SectionList
              chapterIndex={index + 1}
              chapterUrl={chapter.url}
              sections={chapter.sections}
            ></SectionList>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
