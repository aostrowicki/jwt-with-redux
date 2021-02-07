import axios from 'axios'


export const logout = () => ({ type: "LOGOUT" })

export const login = (name, password) => dispatch => {
    axios.post('http://localhost:8080/login', JSON.stringify({ user: { name, password, } }), {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => dispatch({ type: "LOGIN_SUCCESS", payload: res.data.accessToken }))
        .catch(err => { console.log(err.response.data); return dispatch({ type: "LOGIN_FAIL" }) })
}

export const refresh = () => dispatch => {
    axios.get('http://localhost:8080/refresh', {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => dispatch({ type: "REFRESH_SUCCESS", payload: res.data.accessToken }))
        .catch(err => { console.log(err.response.data); return dispatch({ type: "REFRESH_FAIL" }) })
}