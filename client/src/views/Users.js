import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'


export default function Users() {
    let history = useHistory();
    const token = useSelector(state => state.auth.token);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get('http://localhost:8080/users', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        })
            .then(res => setData(res.data))
            .catch(err => { console.log(err.response.data); history.push('/login') })
    }, [token])


    return (
        <div>
            <h2>Users</h2>
            {data?.map(item => <div key={item._id}>{item.name}</div>)}
        </div>
    )
}
