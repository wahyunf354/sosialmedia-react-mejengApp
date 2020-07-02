import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Compressor from 'compressorjs';
// My Component
import EditDetails from '../scream/EditDetails';
import MyButton from '../../utils/MyButton';
import ProfileSkeleton from '../../utils/ProfileSkeleton';
// MUI Stuff
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
// Redux
import { connect } from 'react-redux';
import { logout as logoutUser, uploadImage } from '../../redux/actions/userAction';


const styles = (theme) => ({
  paper: {
    padding: 20
  },

  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#00bcd4'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },

  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
});

class Profile extends Component {

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const {uploadImage} = this.props
    // Melakukan compress img
    new Compressor(image, {
      quality: 0.6,
      success(result) {
        // send image to server
        const formData = new FormData();
        formData.append('image', result, result.name);
        uploadImage(formData);
      },
      error(err) {
        console.log(err.message)
      }
    })
  }

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }

  handleLogout = () => {
    this.props.logoutUser();
  }

  render () {
    const { classes, user: { credentials: { imageUrl, createdAt, handle, bio, website, location}, authenticated, loading } } = this.props;
    
    let profileMarkup = !loading ? ( authenticated ? (
      <Paper className={ classes.paper }>
        <div className={ classes.profile }>
          <div className="image-wrapper">
            <img 
              src={ imageUrl } 
              alt="Profile" 
              className="profile-image" />
            <input 
              type="file" 
              id="imageInput" 
              hidden="hidden" 
              onChange={this.handleImageChange} />
            <MyButton 
              tip="Edit profile picture" 
              onClick={this.handleEditPicture} 
              btnClassName="button" >
                <CameraAltIcon color="primary" />
            </MyButton>
          </div>
          <hr/>
          <div className="profile-details">
            <MuiLink 
              component={ Link } 
              to={`/users/${handle}`} 
              color="primary" 
              variant="body1" >
                @{ handle }
            </MuiLink>
            <hr/>
            { bio && <Typography variant="body2" > { bio } </Typography> }
            <hr/>
            { location && (
              <Fragment>
                <LocationOn color="primary" /> <span>{ location }</span>
                <hr/>
              </Fragment>
            ) }
            { website && (
              <Fragment>
                <LinkIcon color="primary" /> 
                <a href={ website } targer="_blank" rel="noopener noreferrer" >
                  {' '}{ website }
                </a>
                <hr/>
              </Fragment>
            ) }
            <CalendarToday color="primary" />{' '}  
            <span> Joined { dayjs(createdAt).format('MMM YYYY') } </span>
          </div>
          <MyButton tip="Logout" onClick={this.handleLogout} >
            <KeyboardReturn color="primary" />
          </MyButton> 
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={ classes.paper } >
        <Typography variant="body2" align="center" >
          No profile found, please login again
        </Typography>
        <div className={ classes.buttons } >
          <Button 
            color="primary" 
            variant="contained" 
            component={ Link } 
            to="/login" >
              Login
          </Button>
          <Button 
            color="secondary" 
            variant="contained" 
            component={ Link } 
            to="/signup" >
              Signup
          </Button>
        </div>
      </Paper>
    ) ) : (<ProfileSkeleton/>);

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));