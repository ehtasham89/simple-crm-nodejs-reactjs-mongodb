import api from './../lib/services/api';
import authService from './../lib/services/auth';

export const AUTH_USER = 'AUTH_USER';
export const AUTH_BOOT_START = 'AUTH_BOOT_START';
export const AUTH_BOOT_COMPLETE = 'AUTH_BOOT_COMPLETE';
export const AUTH_REQUEST_SEND = 'AUTH_REQUEST_SEND';
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_FAIL = 'AUTH_REQUEST_FAIL';

export const authUser = (user = {}) => ({
    type: AUTH_USER,
    payload: {user}
})

export const requestSend = () => ({
    type: AUTH_REQUEST_SEND
})

export const requestSuccess = (token) => ({
    type: AUTH_REQUEST_SUCCESS,
    payload: { token }
})

export const requestFail = (error) => ({
    type: AUTH_REQUEST_FAIL,
    payload: error
})

export const logout = () => ({
    type: "USER_LOGOUT"
});

export const authenticate = (credencials, setRedirect = e => e) => (dispatch) => {
    dispatch(logout());
    dispatch(requestSend());

    return new Promise((resolve, reject) => {
        api.getAccessToken(credencials).then((tokenObject) => {
            if (tokenObject === undefined) {
                const errorResp = "Login Failed, email or password not correct.";
                dispatch(requestFail(errorResp));
                reject(errorResp);
            } else {
                authService.saveToken(tokenObject).then(() => {
                    dispatch(requestSuccess(tokenObject.accessToken));
                    
                    authService.saveAuthUser({email: credencials.email});

                    resolve();
                }).then(() => {
                    api.getLoggedUser().then(user => {
                        user && dispatch(authUser(user.data));
                        setRedirect(true);
                    });
                });
            }
        }).catch((error) => {
            dispatch(requestFail(errorResp(error)));
            reject(errorResp(error));
        });
    });
}

export const createUser = ({confirmPassword, ...rest}, type, setRedirect = (e) => e) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.registerNewUser(rest, type).then((user) => {
            if (user === undefined) {
                const errorResp = "Sign-Up user faild, Server side error";
                dispatch(requestFail(errorResp));
                reject(errorResp);
            } else {
                setRedirect(true);
                
                dispatch(requestFail("New user register successfully, please login."));
                resolve(null);
            }
        }).catch((error) => {
            dispatch(requestFail(errorResp(error)));
            reject(errorResp(error));
        });
    });
}

const errorResp = (error) => {
    return error && error.response && 
                            error.response.data && 
                            error.response.data.error ? error.response.data.error.message:"Server side error.";
}

