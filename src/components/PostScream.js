import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// Redux Stuff
import { connect } from 'react-redux';
import { postScream } from '../redux/actions/dataAction';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// My Component
import MyButton from '../utils/MyButton';
import { CircularProgress } from '@material-ui/core';

const styles = {
  submitButton: {
    position: 'relative',
    margin: '20px 0'
  },

  progressSpinner : {
    position: 'absolute'
  },

  closeButton : {
    position: 'absolute',
    left: '90%'
  }
}

class PostScream extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      })
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({body: ''})
      this.handleClose()
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false, errors: {} })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.postScream({ body: this.state.body })
  }

  render () {
    const { classes, UI: { loading } } = this.props
    const { errors } = this.state
    return (
      <Fragment>
        <MyButton 
          tip="Post a scream" 
          onClick={ this.handleOpen } >
            <AddIcon />
        </MyButton>
        <Dialog 
          open={ this.state.open } 
          fullWidth 
          maxWidth="sm" 
          onClose={ this.handeClose } >
            <MyButton 
              onClick={ this.handleClose } 
              tip="Close" 
              btnClassName={ classes.closeButton }>
                <CloseIcon />
            </MyButton>
            <DialogTitle>Post new scream</DialogTitle>
            <DialogContent>
              <form onSubmit={ this.handleSubmit }>
                <TextField
                  name="body"
                  type="text"
                  label="Scream"
                  multiline
                  rows="3"
                  placeholder="Scream at your fellow apes"
                  error={ errors.body ? true : false }
                  helperText={ errors.body }
                  className={ classes.textField }
                  onChange={ this.handleChange }
                  fullWidth />
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    className={ classes.submitButton } 
                    disabled={ loading } >
                      Submit
                    {
                      loading && (
                        <CircularProgress 
                          size={30} 
                          className={ classes.progressSpinner } />
                      )
                    }
                  </Button>
              </form>
            </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

const mapActionToProps = {
  postScream
}

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostScream));