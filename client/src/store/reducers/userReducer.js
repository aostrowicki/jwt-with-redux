const defaultState = {
    loggedIn: false,
    token: null
}

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "LOG_IN":
            return {
                loggedIn: true,
                token: action.payload
            }
        case "LOG_OUT":
            return {
                loggedIn: false,
                token: null
            }
        default:
            return state
    }
}

export default userReducer