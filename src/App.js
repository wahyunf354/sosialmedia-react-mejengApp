import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./utils/theme.js";
import JwtDecode from "jwt-decode";
import axios from "axios";
import React from "react";
// My CSS
import "./App.css";
// Redux Stuff
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logout, getUserData } from "./redux/actions/userAction";
// Pages
import signup from "./pages/signup";
import login from "./pages/login";
import home from "./pages/home";
// Components
import AuthRoute from "./utils/AuthRoute";
import Navbar from "./components/layout/Navbar";

// variable style theme global yang diimport dari ./utils/theme
const theme = createMuiTheme(themeFile);

// pengecekan token yang kadarluarsa
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = JwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logout());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store} >
        <Router>
          <Navbar/>
          <div className="container">
            <Switch>
              <Route exact path='/' component={home} />
              <AuthRoute path='/login' component={login} />
              <AuthRoute path='/signup' component={signup} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
