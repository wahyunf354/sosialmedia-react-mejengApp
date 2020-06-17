import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
// My component
import MyButton from "../utils/MyButton";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
// Icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";
// Redux 
import { connect } from "react-redux";
import { deleteScreams } from "../redux/actions/dataAction";

const styles = {
  button: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
};

class DeleteButton extends Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  deleteScream = () => {
    this.props.deleteScreams(this.props.screamId);
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props; 

    return (
      <Fragment>
        <MyButton 
          tip="Delete Scream" 
          onClick={ this.handleOpen } 
          btnClassName={ classes.button }>
            <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog 
          open={ this.state.open }
          onClose={ this.handleClose }
          fullWidth
          maxWidth="sm">
            <DialogTitle>
              Are you sure, you want to delete this scream ?
            </DialogTitle>
            <DialogActions>
              <Button color="primary" onClick={ this.handleClose } >
                Cancel
              </Button>
              <Button color="secondary" onClick={ this.deleteScream } >
                Delete
              </Button>
            </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteButton.propTypes = {
  deleteScreams: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

export default connect(null, { deleteScreams })(withStyles(styles)(DeleteButton));
