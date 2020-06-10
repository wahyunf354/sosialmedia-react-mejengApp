import withStyles from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import AppIcon from '../image/logo.png';
import PropTypes from 'prop-types';

// MUI Stuff
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = {
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto',
    maxWidth: 75
  },
  textField: {
    margin: '20px auto 20px auto'
  },
  button: {
    marginTop: 20
  }
};

class login extends Component {

  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      error: {}
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={ classes.form } >
        <Grid item sm />
        <Grid item sm >
          <img src={ AppIcon } alt="Logo App" className={ classes.image } />
          <Typography variant="h3" className={ classes.pageTitle } > Login </Typography>
          <form onSubmit={ this.handleSubmit } noValidate>
            <TextField 
              id="email" 
              name="email" 
              label="Email"
              type="email" 
              onChange={ this.handleChange }
              value={ this.state.email }
              className={ classes.textField }
              fullWidth /> 
            <TextField 
              id="password" 
              name="password" 
              label="Password"
              type="password" 
              onChange={ this.handleChange }
              value={ this.state.password }
              className={ classes.textField } 
              fullWidth /> 
            <Button variant="contained" color="primary" fullWidth className={ classes.button } > Login </Button>
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
