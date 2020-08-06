import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory({ forceRefresh: true });

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);

