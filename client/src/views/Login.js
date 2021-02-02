import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../store/actions/userActions'

export default function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

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
