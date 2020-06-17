import { 
  SET_SCREAMS, 
  LOADING_DATA, 
  LIKE_SCREAM, 
  UNLIKE_SCREAM, 
  DELETE_SCREAM,
  LOADING_UI,
  POST_SCREAM,
  CLEAR_ERRORS,
  SET_ERRORS
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

// Like Screams
export const likeScream = (screamId) => (dispatch) => {
  axios.get(`/scream/${screamId}/like`)
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


export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
