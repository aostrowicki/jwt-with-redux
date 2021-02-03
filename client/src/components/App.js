import React from 'react'
import Nav from './Nav'
import Login from '../views/Login'
import Register from '../views/Register'
import Users from '../views/Users'
import { Switch, Route } from 'react-router-dom'


function App() {
  return (
    <>
      <Nav />

      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/users' component={Users} />
      </Switch>
    </>
  );
}

export default App;
