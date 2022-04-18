import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, useTheme } from "@mui/styles";
import { Grid, Typography } from "@mui/material";
import Image from "../Image";
import SectionHeader from "../SectionHeader";
import CountUpNumber from "../CountUpNumber";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  placementGrid: {
    display: "flex",
    justifyContent: "space-between",
  },
  placementGridItemMiddle: {
    margin: `0 ${theme.spacing(3)}px`,
  },
  coverImage: {
    boxShadow:
      "25px 60px 125px -25px rgba(80,102,144,.1), 16px 40px 75px -40px rgba(0,0,0,.2)",
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      maxWidth: 500,
    },
  },
}));
const Features = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const [deployGif, setDeployGif] = React.useState("deploy.gif");
  React.useEffect(() => {
    setDeployGif(theme.mode === "light" ? "deploy.gif" : "deployDark.gif");
  }, [theme.mode]);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container spacing={4}>
        <Grid
          item
          container
          justifyContent="flex-start"
          alignItems="center"
          xs={12}
          md={6}
          data-aos="fade-up"
        >
          <Image
            src={deployGif}
            alt="..."
            className={classes.coverImage}
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          />
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={6}
          data-aos="fade-up"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SectionHeader
                title={
                  <span>
                    Custom code editor
                    <br />
                    <Typography
                      component="span"
                      variant="inherit"
                      color="#1976D2"
                    >
                      to deploy any smart contracts.
                    </Typography>
                  </span>
                }
                subtitle="Our interactive course will take you from blockchain zero to blockchain hero."
                align="left"
                fadeUp
                disableGutter
                titleVariant="h3"
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.placementGrid}>
                <div>
                  <CountUpNumber
                    end={20}
                    label="Lessons"
                    textColor="#1976D2"
                    suffix="+"
                  />
                </div>
                <div className={classes.placementGridItemMiddle}>
                  <CountUpNumber
                    end={5}
                    label="Projects"
                    textColor="#1976D2"
                    suffix="+"
                  />
                </div>
                <div>
                  <CountUpNumber
                    end={100}
                    label="Satisfaction"
                    textColor="#1976D2"
                    suffix="%"
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

Features.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Features;
