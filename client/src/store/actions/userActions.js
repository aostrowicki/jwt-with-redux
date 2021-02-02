const setUser = (payload) => ({ type: "LOG_IN", payload })

export const logout = () => ({ type: "LOG_OUT" })


export const login = (name, password) => dispatch => {
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
    .then(data => { if (data.success) dispatch(setUser(data.token)) })
}