import { 
  SET_USER, 
  SET_AUTHENTICATED, 
  SET_UNAUTHENTICETED, 
  LOADING_USER, 
  LIKE_SCREAM, 
  UNLIKE_SCREAM,
  MARK_NOTIFICATIONS_READ 
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  loading: false,
  likes: [],
  notifications: []
};

export default function( state = initialState, action ) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICETED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER: 
      return {
        ...state,
        loading: true
      };
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHendle: state.credentials.handle,
            screamId: action.payload.screamId
          }
        ]
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(like => like.screamId !== action.payload.screamId)
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach(notification => (notification.read = true));
      return {
        ...state
      };
    default:
      return state;
  }
}