const defaultState = {
    isLogged: localStorage.getItem('loggedIn') || false,
    accessToken: '',
}

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "REFRESH_SUCCESS":
            return {
                ...state,
                accessToken: action.payload,
            }

        case "LOGIN_SUCCESS":
            localStorage.setItem('loggedIn', true)
            return {
                isLogged: true,
                accessToken: action.payload,
            }

        case "LOGOUT":
        case "LOGIN_FAIL":
        case "REFRESH_FAIL":
            localStorage.removeItem('loggedIn')
            return {
                isLogged: false,
                accessToken: '',
            }

        default:
            return state
    }
}

export default authReducer