import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import AuthContext from './context/AuthContext';

ReactDOM.render(
  <BrowserRouter>
    <AuthContext>
      <App />
    </AuthContext>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
