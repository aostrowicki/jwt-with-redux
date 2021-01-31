import React, { useState } from 'react'

export default function Register() {
    const [formData, setFormData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: formData })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }


    return (
        <form onSubmit={handleSubmit} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}>
            <h3>Register</h3>
            <label>
                Name:
                <input type="text" name="name" />
            </label>

            <label>
                Password:
                <input type="password" name="password" />
            </label>

            <button type="submit">Register</button>
        </form>
    )
}
