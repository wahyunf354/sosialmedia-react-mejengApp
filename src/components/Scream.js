import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
// My component
import MyButton from '../utils/MyButton';
import DeleteButton from './DeleteButton';
// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux
import { connect } from'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataAction';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 16
  },

  image: {
    minWidth: 200
  },

  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

class Scream extends Component {
  
  likedScream = () => {
    if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId)) {
      return true;
    } else {
      return false;
    }
  } 

  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId);
  }
  
  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
  }

  render() {
    dayjs.extend(relativeTime);
    const { classes, 
      scream : { 
        body, 
        createdAt, 
        userImage, 
        userHendle, 
        screamId, 
        likeCount, 
        commentCount 
      }, user: { 
        authenticated,
        credentials: { handle } 
      } } = this.props;
    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : (
      this.likedScream() ? (
        <MyButton tip="Undo like" onClick={this.unlikeScream}>
          <FavoriteIcon color="primary" />
        </MyButton>
      ) : (
        <MyButton tip="Like" onClick={this.likeScream}>
          <FavoriteBorder color="primary" />
        </MyButton>
      )
    )
    const deleteButton = authenticated && userHendle === handle ? (
      <DeleteButton screamId={ screamId }/>
    ) : null
    return (
     <Card className={ classes.card } >
       <CardMedia
       image={ userImage }
       title="Profile Image" 
       className={ classes.image } />
       <CardContent className={ classes.content }>
        <Typography 
          variant="h5" 
          component={ Link } 
          to={ `/users/${userHendle}` } 
          color="primary" >{ userHendle }
        </Typography>
        { deleteButton }
        <Typography variant="body2" color="textSecondary">
          { dayjs(createdAt).fromNow( ) }
        </Typography>
        <Typography variant="body1" >{ body }</Typography>
        { likeButton } 
        <span>{ likeCount } Likes</span>
        <MyButton tip="comments" >
          <ChatIcon color="primary" />
        </MyButton>
        <span>{ commentCount } comment</span>
       </CardContent>
     </Card>
    );
  }
}

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionToProps = {
  likeScream,
  unlikeScream
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Scream));
