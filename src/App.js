import React from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import { Provider } from 'react-redux';
import store from './store';
import {
  Switch,
  Route,
} from "react-router-dom";



const App = () => {
  return (
    <Provider store={store}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/signup" component={Register}/>
      </Switch>
    </Provider>
  );
}

export default App;
