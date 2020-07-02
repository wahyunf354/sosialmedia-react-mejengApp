import { createStore, combineReducers, applyMiddleware } from "redux";
// import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import dataReducers from "./reducers/dataReducer";
import uiReducers from "./reducers/uiReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducers,
  UI: uiReducers
});


// Code Untuk Development
// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware(...middleware));

// Code Untuk Prodaction
const store = createStore(reducers, initialState, applyMiddleware(...middleware));

export default store;