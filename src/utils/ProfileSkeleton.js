import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import NoImg from "../image/no-image.png";
// MUI Stuff
import Paper from "@material-ui/core/Paper";
// Icons 
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
  paper: {
    padding: 20
  },

  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      display: "flex",
      textAlign: "center",
      alignItems: "center",
      flexDirection: "column",
      "& .handle": {
        height: 18,
        width: 100,
        backgroundColor: "#2a9d8f",
        marginBottom: 10
      },
      "& .fullLine": {
        height: 15,
        width: "90%",
        backgroundColor: "rgba(0,0,0,0.3)",
        marginBottom: 10
      },
      "& .halfLine": {
        height: 15,
        width: "50%",
        backgroundColor: "rgba(0,0,0,0.3)",
        marginBottom: 10
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },

  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
});

function ProfileSkeleton(props) {
  const { classes } = props;
  return (
    <Paper className={ classes.paper }>
        <div className={ classes.profile }>
          <div className="image-wrapper">
            <img 
              src={ NoImg } 
              alt="Profile" 
              className="profile-image" />
          </div>
          <hr/>
          <div className="profile-details">
            <div className="handle" ></div>
            <hr/>
            <div className="fullLine" ></div>
            <div className="fullLine" ></div>
            <hr/>
            <div>
              <LocationOn color='primary'/> <span> Location </span>
            </div>
            <hr/>
            <div>
              <LinkIcon color="primary" /> https//:website.com
            </div>
            <hr/>
            <div>
              <CalendarToday color="primary" /> Joined us
            </div>
          </div>
        </div>
      </Paper>
  );
}

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);
