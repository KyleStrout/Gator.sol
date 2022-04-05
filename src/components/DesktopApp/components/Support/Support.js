import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  ListItem,
  ListItemAvatar,
  Typography,
  Avatar,
  colors,
} from "@mui/material";
import SectionHeader from "../SectionHeader";
import IconAlternate from "../IconAlternate";

const useStyles = makeStyles((theme) => ({
  listItemAvatar: {
    minWidth: 28,
  },
  listItem: {
    [theme.breakpoints.up("sm")]: {
      justifyContent: "center",
    },
  },
  galleryMedia: {
    width: 80,
    height: 80,
    marginLeft: theme.spacing(-2),
    border: `3px solid ${theme.palette.background.paper}`,
    "&:first-child": {
      marginLeft: 0,
    },
    [theme.breakpoints.up("sm")]: {
      width: 100,
      height: 100,
    },
    [theme.breakpoints.up("md")]: {
      width: 140,
      height: 140,
    },
  },
}));

const Contact = (props) => {
  const { data, className, ...rest } = props;
  const classes = useStyles();

  const { items, team } = data;

  return (
    <div className={className} {...rest}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SectionHeader
            label="support team"
            title={
              <>
                <span>
                  Our development team
                  <Typography
                    color="secondary"
                    variant="inherit"
                    component="span"
                  >
                    {" "}
                    will help you along the way.
                  </Typography>
                </span>
              </>
            }
            subtitle="We want to see you succeeed. If you have an issue with a lesson, suggestion for improvement, or request for a feature, please contact us."
            align="center"
            disableGutter
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={0}>
            {items.map((item, index) => (
              <Grid item container xs={6} sm={3} key={index} data-aos="fade-up">
                <ListItem disableGutters className={classes.listItem}>
                  <ListItemAvatar className={classes.listItemAvatar}>
                    <IconAlternate
                      size="extraSmall"
                      shape="circle"
                      fontIconClass="fas fa-check"
                      color={colors.deepOrange}
                    />
                  </ListItemAvatar>
                  <Typography variant="subtitle1" color="secondary" noWrap>
                    {item}
                  </Typography>
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="space-around"
          xs={12}
          data-aos="fade-up"
        >
          {team.map((item, index) => (
            <Avatar
              key={index}
              className={classes.galleryMedia}
              alt={item.authorName}
              {...item.authorPhoto}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

Contact.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * Data to render
   */
  data: PropTypes.object.isRequired,
};

export default Contact;
