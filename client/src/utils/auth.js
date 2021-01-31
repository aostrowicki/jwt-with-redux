let tokenState;

export const login = ({ token }) => {
    tokenState = token;
}

export const isLogged = () => tokenState ? true : false;

export const getToken = () => tokenState ? tokenState : '';