import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
// MUI Stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
// Redux Stuff
import { connect } from "react-redux";
import { marknotificationsRead } from '../../redux/actions/userAction';

class Notifications extends Component {
  state = {
    anchorEl: null,
  }

  handleOpen = (event) => {
    this.setState({ anchorEl: event.target });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  onMenuOpened = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter(not => !not.read)
      .map(not => not.notioficationId);
    this.props.marknotificationsRead(unreadNotificationsIds);
  }

  render () {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter(not => not.read === false).length > 0 
        ? notificationsIcon = (
          <Badge badgeContent={ notifications.filter(not => not.read === false).length } color="secondary">
            <NotificationsIcon />
          </Badge>
        ) : (
          notificationsIcon = <NotificationsIcon />
        )
    } else {
      notificationsIcon = <NotificationsIcon />
    }

    let notificationsMarkup = notifications && notifications.length > 0 ? (
      notifications.map(not => {
        const verb = not.type === 'like' ? 'liked' : 'commented on'; 
        const time = dayjs(not.createdAt).fromNow();
        const iconColor = not.read ? 'primary' : 'secondary';
        const icon = not.type === 'like' ? (
          <FavoriteIcon color={iconColor} style={{ marginRight: 10 }}/>
        ) : (
          <ChatIcon color={iconColor} style={{ marginRight: 10 }}/>
        )

        return (
          <MenuItem key={not.createdAt} onClick={this.handleClose}>
            { icon }
            <Typography
              variant="body1"
              component={ Link }
              to={ `/user/${ not.recipient }/scream/${ not.screamId }` } >
                { not.sender } { verb } your scream { time }
              </Typography>
          </MenuItem>
        )
      })
    ) : (
      <MenuItem onClick={ this.handleClose } >
        You have no notifications yet
      </MenuItem>
    )
    return (
      <Fragment>
        <Tooltip plament="top" title="Notifications">
          <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} 
            arial-haspopup="true"
            onClick={ this.handleOpen }
            >
              { notificationsIcon }
            </IconButton> 
        </Tooltip>
        <Menu 
          anchorEl={ anchorEl }
          open={ Boolean(anchorEl) }
          onClose={ this.handleClose }
          onEntered={ this.onMenuOpened } 
          >
            { notificationsMarkup }
        </Menu>
      </Fragment>
    )
  }
}

Notifications.propTypes = {
  marknotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  notifications: state.user.notifications
})

export default connect(mapStateToProps, { marknotificationsRead })(Notifications);