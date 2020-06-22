import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
// MUI
import Grid from '@material-ui/core/Grid';
// Redux
import { connect } from "react-redux";
import { getUserData } from '../redux/actions/dataAction';
// My Component
import Screams from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";


class user extends Component  {
  state = {
    profile: null
  }

  componentDidMount () {
    const handle = this.props.match.params.handle;
    this.props.getUserData(handle);
    axios.get(`/user/${ handle }`)
      .then(res => {
        this.setState({
          profile: res.data.user
        })
      })
      .catch(err => console.log(err));
  }

  render () {
    const { screams, loading } = this.props.data;
    const screamMarkup = loading ? (
      <p>loading...</p>
    ) : screams === null ? (
      <p>No screams from this user</p>
    ) : (
      screams.map(scream => <Screams key={ scream.screamsId } scream={ scream } />) 
    )
    return (
      <Fragment>
        <Grid container spacing={3} >
          <Grid item sm={8} xs={12} >
            { screamMarkup }
          </Grid>
          <Grid item sm={4} xs={12} >
              {
                this.state.profile === null ? (
                  <p>Loading...</p>
                ) : (
                  <StaticProfile profile={ this.state.profile } />
                )
              }      
          </Grid>
        </Grid>
      </Fragment>
    )
  }
};

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getUserData })(user);