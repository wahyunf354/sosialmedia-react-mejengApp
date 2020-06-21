import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
// Redux 
import { connect } from "react-redux";
import { postComment } from "../../redux/actions/dataAction";
// MUI Stuff
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
// My Component
import MyButton from '../../utils/MyButton';
// Icons 
import SendIcon from '@material-ui/icons/Send';

const styles = {
  textField: {
    marginBottom: 10
  }
};

class CommentForm extends Component {
  state = {
    body: '',
    errors: {}
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '' });
    }
  }

  handleChange = (event) => {
    this.setState({
      body: event.target.value
    })
  }

  handleSubmit = () => {
    this.props.postComment(this.props.screamId, { body: this.state.body })
  }

  render() {
    const { authenticated, classes } = this.props
    const errors = this.state.errors
    const postCommentMarkup = authenticated ? (
      <Grid container>
        <Grid item sm={11} >
          <TextField 
            name="commentData"
            type="text"
            fullWidth
            label="Comment on scream"
            onChange={ this.handleChange }
            className={ classes.textField }
            error={ errors.comment ? true : false }
            value={ this.state.body }
            helperText={errors.comment} />
        </Grid>
        <Grid item sm={1} >
          <MyButton onClick={this.handleSubmit} tip="Publish" >
            <SendIcon color="primary" />
          </MyButton>
        </Grid>
      </Grid>
    ) : null
    return postCommentMarkup;
  }
}

CommentForm.porpTypes = {
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  postComment: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

const mapActionToProps = {
  postComment
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CommentForm));
