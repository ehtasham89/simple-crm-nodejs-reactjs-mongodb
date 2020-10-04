import api from './../lib/services/api';
import {requestFail} from './../Auth/actions';

export const USER_LIST = 'USER_LIST';
export const USER_CURRENT = 'USER_CURRENT';

export const userList = (list = {}) => ({
    type: USER_LIST,
    payload: {list}
})

export const currentUser = (user = {}) => ({
    type: USER_CURRENT,
    payload: {current: user}
})

export const getUserList = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.getUserList().then(list => {
            list && dispatch(userList(list.data));
        }).catch((error) => {
            dispatch(userList([]));
        });
    });
}

export const deleteUser = (userId, authUserId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.deleteUser(userId).then(res => dispatch(getUserList(authUserId)))
    });
}

export const setCurrentUser = (data, setRedirect = e => e) => (dispatch) => {
    return new Promise((resolve) => {
        resolve(dispatch(currentUser(data)));
        setRedirect(true);
    });
}

export const updateUser = (id, data, setRedirect = e => e) => (dispatch) => {
    return new Promise((resolve) => {
        api.updateUser(id, data).then(res => {
            dispatch(currentUser(res.data));
            dispatch(requestFail("User updated successfully, Go to user list."));
            setRedirect(true);
        }); 
    });
    
}


