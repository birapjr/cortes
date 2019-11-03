import React from 'react';
import Main from './Main';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import muiTheme from './theme/muiTheme';
import './App.css';

const App = () => (
  <MuiThemeProvider theme={muiTheme}>
    <div className="App">
      <Main />
    </div>
  </MuiThemeProvider>
);

export default App;