const defaultState = {
    isLogged: false,
    token: ''
}

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                isLogged: true,
                token: action.payload
            }
        case "LOGOUT":
        case "LOGIN_FAIL":
            return {
                isLogged: false,
                token: ''
            }
        default:
            return state
    }
}

export default authReducer