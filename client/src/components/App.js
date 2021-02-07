import React, { useEffect } from 'react'
import Nav from './Nav'
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import Users from '../views/Users'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { refresh } from '../store/actions/authActions'


function App() {
  const isLogged = useSelector(state => state.auth.isLogged)
  const accessToken = useSelector(state => state.auth.accessToken)
  const dispatch = useDispatch();

  useEffect(() => {
    let refreshInterval;

    if (isLogged) {
      if (!accessToken) {
        dispatch(refresh());
      } else {
        refreshInterval = setInterval(() => dispatch(refresh()), 60 * 1000);
      }
    }

    return () => {
      clearInterval(refreshInterval);
    }
  }, [isLogged, accessToken])


  return (
    <>
      <Nav />

      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/users' component={Users} />
      </Switch>
    </>
  )
}

export default App;
