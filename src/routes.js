import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import LoginContainer from './components/Login';
import CompanySearch from './components/CompanySearch';
import Company from './components/Company';
import RegisterContainer from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import NoMatch from './components/NoMatch';

const Main = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginContainer} />
      <Route exact path="/register" component={RegisterContainer} />
      <PrivateRoute exact path="/" component={CompanySearch} />
      <PrivateRoute exact path="/company/:id" component={Company} />
      <Route component={NoMatch} />
    </Switch>
  </BrowserRouter>
);

export default Main;
