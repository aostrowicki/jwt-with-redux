const defaultState = {
    isLogged: false,
    token: ''
}

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "LOG_IN":
            return {
                isLogged: true,
                token: action.payload
            }
        case "LOG_OUT":
            return {
                isLogged: false,
                token: ''
            }
        default:
            return state
    }
}

export default userReducer