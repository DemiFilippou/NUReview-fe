import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Login from './components/Login';
//import Home from './components/Home';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';

const Main = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      {
        //<PrivateRoute exact path="/" component={Home} />
      }
    </Switch>
  </BrowserRouter>
);

export default Main;
