import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/actions/userActions'

export default function Nav() {
    const loggedIn = useSelector(state => state.userReducer.loggedIn)
    const dispatch = useDispatch();

    
    return (
        <ul>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/users'>Users (protected)</Link></li>
            {loggedIn && <li onClick={() => dispatch(logout())}>Logout</li>}
        </ul>
    )
}
