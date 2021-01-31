import React, { useState } from 'react'
import { login } from '../utils/auth.js'

export default function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: {
                    name: name,
                    password: password,
                }
            })
        })
            .then(res => res.json())
            .then(data => login(data))
            .catch(err => console.log(err));
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
