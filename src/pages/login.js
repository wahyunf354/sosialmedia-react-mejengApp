import withStyles from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppIcon from '../image/logo.png';
import PropTypes from 'prop-types';
import axios from 'axios';

// MUI Stuff
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
  ...theme.formAuth
})

class login extends Component {

  constructor () {
    super();
    this.state = {
      isLoading: false,
      password: '',
      email: '',
      error: {}
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
    axios.post('/login', user)
      .then((result) => {
        localStorage.setItem('FBIdToken', `Bearer ${result.data.token}`)
        this.setState({
          isLoading: false
        })
        this.props.history.push('/')
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          error: err.response.data
        })
      })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props;
    const { error, isLoading } = this.state;
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
              disabled={isLoading}
              variant="contained" 
              color="primary" 
              type="submit" 
              fullWidth >
              Login 
              { isLoading && (
                <CircularProgress size={27} className={ classes.loading } />
              ) }
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(login);
