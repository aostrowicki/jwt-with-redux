import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'


export default function Users() {
    let history = useHistory();
    const isLogged = useSelector(state => state.auth.isLogged);
    const accessToken = useSelector(state => state.auth.accessToken);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!isLogged) {
            console.log('You are not logged in');
            history.push('/login');
        } else if (accessToken)
            axios.get('http://localhost:8080/users', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${accessToken}`
                }
            })
                .then(res => setData(res.data))
                .catch(err => { console.log(err.response.data); history.push('/login'); })
    }, [isLogged, accessToken])


    return (
        <div>
            <h2>Users</h2>
            {data?.map(item => <div key={item._id}>{item.name}</div>)}
        </div>
    )
}
