import { 
  SET_SCREAMS, 
  LOADING_DATA, 
  LIKE_SCREAM, 
  UNLIKE_SCREAM, 
  DELETE_SCREAM,
  LOADING_UI,
  POST_SCREAM,
  CLEAR_ERRORS,
  SET_ERRORS,
  SET_SCREAM,
  STOP_LOADING_UI,
  POST_COMMENT
} from "../types";
import axios from "axios";

// Get All Screams
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios.get("/screams")
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: []
      });
    });
};

// Get a scream by id
export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.get(`/scream/${ screamId }`)
    .then(res => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => {
      console.log(err); 
    });
};

// post a Scream
export const postScream = (bodyScream) => (dispatch) => {
  dispatch({type: LOADING_UI});
  axios.post("/screams", bodyScream)
    .then(res => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data
      });
      dispatch(clearError());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
}; 

// Post Comment
export const postComment = (screamId, commentData) => (dispatch) => {
  axios.post(`/scream/${ screamId }/comment`, commentData)
    .then(res => {
      dispatch({
        type: POST_COMMENT,
        payload: res.data
      });
      dispatch(clearError());
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// Like Screams
export const likeScream = (screamId) => (dispatch) => {
  axios.get(`/scream/${ screamId }/like`)
    .then(res => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      });
    })  
    .catch(err => console.log(err));
};

// unlike scream
export const unlikeScream = (screamId) => (dispatch) => {
  axios.get(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Delete Scream
export const deleteScreams = (screamId) => (dispatch) => {
  axios.delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId
      });
    })
    .catch(err => console.log(err));
};

// Get User Data
export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  // Memanggil data user sesuai userhandle
  axios.get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.screams
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: null
      });
    });
};


export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
