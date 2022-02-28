import React from "react";
import { makeStyles } from "@mui/styles";
import { colors, Divider } from "@mui/material";
import Section from "./components/Section";

import { Hero, Hub, Support } from "./components";

import { support } from "./data";

const useStyles = makeStyles((theme) => ({
  pagePaddingTop: {
    paddingTop: 3,
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(5),
    },
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
  shape: {
    background: "rgb(247, 249, 250)",
    borderBottomRightRadius: "50%",
    borderBottom: `1px solid ${colors.grey[200]}`,
  },
}));

const DesktopApp = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.shape}>
        <Section className={classes.pagePaddingTop}>
          <Hero />
        </Section>
        <Section className={classes.sectionNoPaddingTop}>
          <Hub />
        </Section>
      </div>
      <Section narrow>
        <Support data={support} />
      </Section>
      <Divider />
    </div>
  );
};

export default DesktopApp;
