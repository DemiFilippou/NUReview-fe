import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Login from './components/Login';
import CompanySearch from './components/CompanySearch';
import Company from './components/Company';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';

const Main = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/" component={CompanySearch} />
      <PrivateRoute exact path="/company/:id" component={Company} />
    </Switch>
  </BrowserRouter>
);

export default Main;
