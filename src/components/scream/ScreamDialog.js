import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// My Component
import MyButton from "../../utils/MyButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from './CommentForm';
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
import { getScream, clearError } from "../../redux/actions/dataAction";

const styles = {
  invisibleSeparator: {
    border: 'none',
    margin: 5
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: 10
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
    open: false,
    oldPath: '',
    newPath: ''
  }

  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, screamId } = this.props;
    const newPath = `/user/${ userHandle }/scream/${ screamId }`;

    if (oldPath === newPath) oldPath = `/users/${ userHandle }`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getScream(this.props.screamId)
  }

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false })
    this.props.clearError();
  }

  componentDidMount () {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  render () {
    const { 
      classes, 
      scream: { 
        body, 
        userHandle,
        screamId, 
        likeCount, 
        userImage, 
        createAt, 
        commentCount,
        comments
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
            to={ `/user/${userHandle}` } >
              @{ userHandle }
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
        <hr className={ classes.visibleSeparator } />
        <CommentForm screamId={ screamId } />
        <hr className={ classes.invisibleSeparator } />
        <Comments comments={ comments } />
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
  classes: PropTypes.object.isRequired,
  clearError: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  scream: state.data.scream
});

const mapActionToProps = {
  getScream,
  clearError
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ScreamDialog));