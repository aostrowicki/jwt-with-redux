import axios from 'axios'


export const logout = () => ({ type: "LOG_OUT" })

export const login = (name, password) => dispatch => {
    axios.post('http://localhost:8080/login', JSON.stringify({ user: { name, password, } }), {
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => dispatch({ type: "LOG_IN", payload: res.data.token }))
        .catch(err => console.log(err.response.data))
}
