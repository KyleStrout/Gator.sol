import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@mui/styles";
import { useMediaQuery, Grid, Button, Typography } from "@mui/material";
import Image from "../Image";
import SectionHeader from "../SectionHeader";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  image: {
    boxShadow:
      "25px 60px 125px -25px rgba(80,102,144,.1), 16px 40px 75px -40px rgba(0,0,0,.2)",
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      maxWidth: 500,
    },
  },
}));

const Hero = (props) => {
  const navigate = useNavigate();
  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();

  return (
    <div className={className} {...rest}>
      <Grid
        container
        justify="space-between"
        spacing={4}
        direction="row"
        //{isMd ? "row" : "column-reverse"}
      >
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          md={6}
          data-aos={"fade-up"}
        >
          <SectionHeader
            title={
              <span>
                Learn Blockchain and Solidity
                <br />
                <Typography component="span" variant="inherit" color="#1976D2">
                  the right way.
                </Typography>
              </span>
            }
            subtitle="Learn, compile and deploy smart contracts with this interactive course. Get started with the basics of blockchain and solidity today."
            ctaGroup={[
              <Button
                variant="contained"
                style={{ backgroundColor: "#1976D2" }}
                size="large"
                onClick={() => {
                  navigate("/course/course-introduction/course-overview");
                }}
              >
                Start now
              </Button>,
              <Button
                variant="outlined"
                style={{ color: "#1976D2", outlineColor: "#1976D2" }}
                size="large"
                onClick={() => {
                  navigate("/about");
                }}
              >
                Learn more
              </Button>,
            ]}
            align="left"
            disableGutter
            titleVariant="h3"
          />
        </Grid>
        <Grid
          item
          container
          justify="flex-start"
          alignItems="center"
          xs={12}
          md={6}
          data-aos={"fade-up"}
        >
          <Image
            src="dashboard.png"
            alt="TheFront Company"
            className={classes.image}
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          />
        </Grid>
      </Grid>
    </div>
  );
};

Hero.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Hero;
