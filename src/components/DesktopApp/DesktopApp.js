import React from "react";
import { makeStyles } from "@mui/styles";
import { colors, Divider } from "@mui/material";
import Section from "./components/Section";

import { Hero, Hub, Support } from "./components";

import { support } from "./data";

const useStyles = makeStyles((theme) => ({
  pagePaddingTop: {
    paddingTop: 16,
  },
  sectionNoPaddingTop: {
    paddingTop: 16,
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
      <div className={classes.shape}
             sx={{
              background: 'rgb(139 139 139)',
            }}>
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
