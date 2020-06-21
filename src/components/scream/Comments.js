import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = {
  imgComment: {
    maxWidth: "100%",
    height: 100,
    borderRadius: "50%",
    objectFit: "cover",
    marginLeft: 5
  },
  commentData: {
    marginLeft: 20
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: 10
  },
  textTime: {
    fontSize: 12
  }
};

class Comments extends Component {
  render () {
    const { classes, comments } = this.props;
    return (
      <Grid container >
        {
          comments.map((comment, index) => {
            const { body, createAt, userHandle, userImage } = comment;
            return (
              <Fragment key={ createAt } >
                <Grid item sm={12}>
                  <Grid container >
                    <Grid item sm={2} >
                      <img src={userImage} alt="comment" className={ classes.imgComment } />
                    </Grid>
                    <Grid item sm={9} className={ classes.commentData }>
                      <Typography variant="h6" color='primary' className={ classes.userHandleText } component={ Link } to={`user/${userHandle}`} >
                        @{ userHandle }
                      </Typography>
                      <Typography variant="subtitle1" className={ classes.textTime } color="textSecondary" >
                        { dayjs(createAt).format("h:mm, MMMM DD YYYY") }
                      </Typography>
                      <Typography variant="body1" >
                        { body }
                      </Typography>
                    </Grid>
                  </Grid>  
                </Grid>
                {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
                )} 
              </Fragment>
            );
          })
        }        
      </Grid>
    );
  }
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
};


export default withStyles(styles)(Comments);

