import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function Users() {
    let history = useHistory();
    const token = useSelector(state => state.userReducer.token);
    const [data, setData] = useState();

    useEffect(() => {
        if (!token) {
            console.log("You're not logged in");
            history.push('/login');
        }
        else {
            fetch('http://localhost:8080/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => setData(data))
                .catch(err => {
                    console.log(err);
                    history.push('/login');
                })
        }
    }, [])


    return (
        <div>
            <h2>Users</h2>
            {data?.map(item => <div key={item._id}>{item.name}</div>)}
        </div>
    )
}
