import React from "react";
import PropTypes from "prop-types";
// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import CardMedia from "@material-ui/core/CardMedia";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const styles = {
  imgDesktop: {
    minWidth: 200,
    borderRadius: "50%"
  },

  imgMobile: {
    minWidth: 100,
    borderRadius: "50%"
  }

};

const ImgProfileScream = ({ userImage, classes }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const cardMedia = isDesktop ? (
    <CardMedia
       image={ userImage }
       title="Profile Image" 
       className={ classes.imgDesktop  } />
  ) : (
    <CardMedia
       image={ userImage }
       title="Profile Image" 
       className={ classes.imgMobile  } />
  );
  return cardMedia;
};

ImgProfileScream.propTypes = {
  userImage: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImgProfileScream);
