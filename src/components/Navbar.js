import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// My Component
import MyButton from '../utils/MyButton';

// Icons
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

class Navbar extends Component {
  render() {
    const { authenticated } = this.props; 
    return (
      <AppBar>
        <Toolbar className="nav__container" >
          {
            authenticated ? (
              <Fragment>
                <MyButton tip="Post a Scream">
                  <AddIcon />
                </MyButton>
                <Link to="/" >
                  <MyButton tip="Home" >
                    <HomeIcon />
                  </MyButton>
                </Link>
                <MyButton tip="Notifications" >
                  <Notifications />
                </MyButton>
              </Fragment>
            ) : (
              <Fragment>
                <Button color="inherit" component={Link} to="/" > Home </Button>
                <Button color="inherit" component={Link} to="/login" > Login </Button>
                <Button color="inherit" component={Link} to="/signup" > Sign up </Button>
              </Fragment>
            )
          }
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);