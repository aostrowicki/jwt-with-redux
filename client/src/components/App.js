import React from 'react'
import Login from '../views/Login'
import Register from '../views/Register'
import Users from '../views/Users'

import { Switch, Route, Link } from 'react-router-dom'


function App() {

  return (
    <div>
      <ul>
        <li><Link to='/home'>Home</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/users'>Users (protected)</Link></li>
      </ul>

      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/users' component={Users} />
      </Switch>
    </div>
  );
}

export default App;
