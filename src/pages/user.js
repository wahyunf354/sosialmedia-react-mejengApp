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
import ScreamSkeleton from "../utils/ScreamSkeleton";
import ProfileSkeleton from '../utils/ProfileSkeleton';



class user extends Component  {
  state = {
    profile: null,
    screamIdParam: null
  }

  componentDidMount () {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;

    if (screamId) this.setState({ screamIdParam: screamId })

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
    const { screamIdParam } = this.state;

    const screamMarkup = loading ? (
      <ScreamSkeleton/>
    ) : screams === null ? (
      <p>No screams from this user</p>
    ) : !screamIdParam ? (
      screams.map(scream => <Screams key={ scream.screamsId } scream={ scream } />) 
    ) : (
      screams.map(scream => {
        if (scream.screamId !== screamIdParam) return <Screams key={ scream.screamsId } scream={ scream } />
        else return <Screams key={ scream.screamsId } scream={ scream } openDialog />
      })
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
                  <ProfileSkeleton />
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