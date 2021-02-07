import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../store/actions/authActions'

export default function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.auth.isLogged);
    let history = useHistory();

    useEffect(() => {
        if (isLogged) {
            history.push('/');
        }
    }, [isLogged])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(name, password));
    }


    return (
        <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>

            <button type="submit">Login</button>
        </form>
    )
}
