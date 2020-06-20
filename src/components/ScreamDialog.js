import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// My Component
import MyButton from "../utils/MyButton";
import LikeButton from "./LikeButton";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
// Redux Stuff
import { connect } from "react-redux";
import { getScream } from "../redux/actions/dataAction";

const styles = {
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  dialogContent: {
    padding: 20
  },
  loading: {
    left: '50%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    margin: '50px 0px',
  }
};

class ScreamDialog extends Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
    this.props.getScream(this.props.screamId)
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render () {
    const { 
      classes, 
      scream: { 
        body, 
        userHendle,
        screamId, 
        likeCount, 
        userImage, 
        createAt, 
        commentCount  
      }, UI: { loading } } = this.props;
    const dialogMarkup = loading ? (
      <div className={ classes.spinnerDiv } >
        <CircularProgress size={50} thickness={2}/>
      </div>
    ) : (
      <Grid container spacing={2} >
        <Grid item sm={5} >
          <img src={ userImage } alt="Profile" className={ classes.profileImage } />
        </Grid>
        <Grid item sm={7} >
          <Typography
            component={ Link } 
            color="primary"
            variant="h5"
            to={ `/user/${userHendle}` } >
              @{ userHendle }
            </Typography>
            <hr className={ classes.invisibleSeparator } />
            <Typography variant="body2" color="textSecondary" >
              { dayjs(createAt).format('h:mm a, MMMM DD YYYY') }
            </Typography>
            <hr className={ classes.invisibleSeparator } />
            <Typography variant="body1">
              { body }
            </Typography>
            <LikeButton screamId={ screamId } />
            <span>{ likeCount } Likes</span>
            <MyButton tip="comments" >
              <ChatIcon color="primary" />
            </MyButton>
            <span>{ commentCount } comment</span>            
        </Grid>
      </Grid>
    )
    return (
      <Fragment>
        <MyButton 
          onClick={ this.handleOpen } 
          tip="Expand scream" 
          btnClassName={ classes.expandButton } >
            <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={ this.state.open } 
          fullWidth 
          maxWidth="sm" 
          onClose={ this.handleClose } >
            <MyButton 
              onClick={ this.handleClose } 
              tip="Close" 
              btnClassName={ classes.closeButton }>
                <CloseIcon />
            </MyButton>
          <DialogContent className={ classes.dialogContent } >
            { dialogMarkup }
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  scream: state.data.scream
});

const mapActionToProps = {
  getScream
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ScreamDialog));