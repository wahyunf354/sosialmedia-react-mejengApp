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
import { signupUser } from '../redux/actions/userAction';

const styles = (theme) => ({
  ...theme.formAuth
})

class signup extends Component {

  constructor () {
    super();
    this.state = {
      confirmPassword: '',
      isLoading: false,
      password: '',
      handle: '',
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
    const newUser = {
      confirmPassword: this.state.confirmPassword,
      password: this.state.password,
      handle: this.state.handle,
      email: this.state.email
    }
    this.props.signupUser(newUser, this.props.history)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes, UI: { loading:isLoading } } = this.props;
    const { error } = this.state;
    return (
      <Grid container className={ classes.form } >
        <Grid item sm />
        <Grid item sm >
          <img src={ AppIcon } alt="Logo App" className={ classes.image } />
          <Typography variant="h3" className={ classes.pageTitle } > Sign Up </Typography>
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
            <TextField 
              error={ error.confirmPassword ? true : false }
              className={ classes.textField } 
              onChange={ this.handleChange }
              value={ this.state.confirmPassword }
              helperText={ error.confirmPassword }
              label="Confirm Password"
              name="confirmPassword" 
              type="password" 
              id="confirmPassword" 
              fullWidth />
            <TextField 
              error={ error.handle ? true : false }
              className={ classes.textField } 
              onChange={ this.handleChange }
              value={ this.state.handle }
              helperText={ error.handle }
              label="Handle"
              name="handle" 
              type="text" 
              id="handle" 
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
              disabled={ isLoading }
              variant="contained" 
              color="primary" 
              type="submit" 
              fullWidth >
              Signup
              { isLoading && (
                <CircularProgress size={27} className={ classes.loading } />
                ) 
              }
            </Button>
            <small> Already have an account? log in <Link to="/login" > here </Link> </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionToProps = {
  signupUser
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(signup));
