import api from './../lib/services/api';
import authService from './../lib/services/auth';

export const AUTH_BOOT_START = 'AUTH_BOOT_START';
export const AUTH_BOOT_COMPLETE = 'AUTH_BOOT_COMPLETE';
export const AUTH_REQUEST_SEND = 'AUTH_REQUEST_SEND';
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_FAIL = 'AUTH_REQUEST_FAIL';

export const authBootStart = () => ({
    type: AUTH_BOOT_START
})

export const authBootComplete = (token, user = {}) => ({
    type: AUTH_BOOT_COMPLETE,
    payload: { token, user, bootcomplete: true }
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

export const bootAuthentication = (callback = e => e) => (dispatch) => {
    dispatch(authBootStart());
    
    return new Promise((resolve, reject) => {
        authService.loadToken().then((token) => {
            token && api.getLoggedUser().then(user => {
                        authService.loadAuthUser();
                        
                        dispatch(authBootComplete(token, user));

                        resolve(null)
                    }).catch(e => {
                        dispatch(authBootComplete(null));
                        
                        authService.removeToken();

                        callback();

                        //reject("Token not found or expired!");
                    });
            
            !token && dispatch(authBootComplete(null));
        });
    });
}

export const authenticate = (credencials) => (dispatch) => {
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
                        dispatch(authBootComplete(tokenObject.accessToken, user && user.data));
                    });
                });
            }
        }).catch((error) => {
            console.log("error", error);
            const errorMsg = error && error.response && 
                            error.response.data && 
                            error.response.data.error ? error.response.data.error.message:"Server side error.";

            dispatch(requestFail(errorMsg));
            
            reject(error);
        });
    });
}

