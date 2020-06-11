import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './utils/theme.js';
import JwtDecode from 'jwt-decode';
import React from 'react';
// My CSS
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
// Pages
import signup from './pages/signup';
import login from './pages/login';
import home from './pages/home';
// Components
import AuthRoute from './utils/AuthRoute';
import Navbar from './components/Navbar';

// variable style theme global yang diimport dari ./utils/theme
const theme = createMuiTheme(themeFile);

// pengecekan token yang kadarluarsa
let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = JwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
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
              <AuthRoute path='/login' component={login} authenticated={authenticated} />
              <AuthRoute path='/signup' component={signup} authenticated={authenticated} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
