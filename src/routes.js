import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
import FormPage from './containers/FormPage';
import TablePage from './containers/TablePage';
import Dashboard from './containers/DashboardPage';
import StudentFormPage from './containers/StudentFormPage';
import ParentFormPage from './containers/ParentFormPage';
import RoomContainer from './containers/RoomContainer';
import RoomRegisterContainer from './containers/RoomRegisterContainer';
import StudentDetail from './containers/StudentDetail';
import ActivityComp from './containers/ActivityCmp'

export default (
  <Route>
    <Route path="login" component={LoginPage}/>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="students" component={Dashboard}/>
      <Route path="rooms" component={RoomContainer}/>
      <Route path="rooms-register" component={RoomRegisterContainer}/>
      <Route path="student-register" component={StudentFormPage}/>
      <Route path="parent-register" component={ParentFormPage}/>
      <Route path="detail/:id" component={StudentDetail}/>
      <Route path="activity/:id" component={ActivityComp}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
