import React, { useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import { isLogged, getToken } from '../utils/auth.js'


export default function Users() {
    let history = useHistory();

    useEffect(() => {
        if (!isLogged()) {
            console.log('Not logged in');
            history.push("/login")
        }
        else {
            fetch('http://localhost:8080/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getToken()}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.message) {
                        console.log('Authentication failed');
                        history.push("/login")
                    } else {
                        console.log(data);
                    }
                })
                .catch(err => console.log(err))
        }
    }, [])


    return (
        <div>
            <h2>Users</h2>
        </div>
    )
}
