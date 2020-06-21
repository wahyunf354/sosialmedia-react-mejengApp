import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import PropTypes from "prop-types";
// Component
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
// Redux Stuff
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataAction";

class home extends Component {

  componentDidMount () {
    this.props.getScreams();
  }


  render() {
    const { screams, loading } = this.props.data;
    let screamsDisplay = !loading ? (
      screams.map(scream => <Scream scream={ scream } key={ scream.screamId } />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          { screamsDisplay }
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getScreams })(home);
