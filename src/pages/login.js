import withStyles from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppIcon from '../image/logo.png';
import PropTypes from 'prop-types';
// MUI Stuff
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// Redux Stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userAction';

const styles = (theme) => ({
  ...theme.formAuth
})

class login extends Component {

  constructor () {
    super();
    this.state = {
      password: '',
      email: '',
      error: {}
    }
  }

  componentWillReceiveProps ({ UI }) {
   if (UI.errors) {
    this.setState({ error: UI.errors })
   }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isLoading: true
    });
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(user, this.props.history)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes, UI: { loading } } = this.props;
    const { error  } = this.state;
    return (
      <Grid container className={ classes.form } >
        <Grid item sm />
        <Grid item sm >
          <img src={ AppIcon } alt="Logo App" className={ classes.image } />
          <Typography variant="h3" className={ classes.pageTitle } > Login </Typography>
          <form onSubmit={ this.handleSubmit } noValidate>
            <TextField 
              error={ error.email ? true : false }
              className={ classes.textField }
              onChange={ this.handleChange }
              helperText={ error.email }
              value={ this.state.email }
              label="Email"
              type="email" 
              name="email" 
              id="email" 
              fullWidth /> 
            <TextField 
              error={ error.password ? true : false }
              className={ classes.textField } 
              onChange={ this.handleChange }
              value={ this.state.password }
              helperText={ error.password }
              label="Password"
              name="password" 
              type="password" 
              id="password" 
              fullWidth />
              {
                error.ganeral && (
                  <Typography variant="body2" className={ classes.customError } >
                    { error.ganeral }
                  </Typography>
                )
              }
            <Button 
              className={ classes.button }  
              disabled={ loading }
              variant="contained" 
              color="primary" 
              type="submit" 
              fullWidth >
              Login 
              { loading && (
                <CircularProgress size={27} className={ classes.loading } />
                ) 
              }
            </Button>
            <small> don't have an account? sign up <Link to="/signup" > here </Link> </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(login));
