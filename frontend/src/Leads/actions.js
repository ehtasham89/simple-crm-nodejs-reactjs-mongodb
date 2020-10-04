import api from './../lib/services/api';
import {requestFail} from './../Auth/actions';

export const LEADS_LIST = 'LEADS_LIST';
export const LEADS_CURRENT = 'LEADS_CURRENT';

export const leadsList = (list = {}) => ({
    type: LEADS_LIST,
    payload: {list}
})

export const currentLeads = (leads = {}) => ({
    type: LEADS_CURRENT,
    payload: {current: leads}
})

export const getLeadsList = (leadsId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.getLeadsList(leadsId).then(list => {
            list && dispatch(leadsList(list.data));
        }).catch((error) => {
            dispatch(leadsList([]));
        });
    });
}

export const deleteLeads = (leadsId, authUserId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.deleteLeads(leadsId).then(res => dispatch(getLeadsList(authUserId)))
    });
}

export const setCurrentLeads = (data, setRedirect = e => e) => (dispatch) => {
    return new Promise((resolve) => {
        resolve(dispatch(currentLeads(data)));
        setRedirect(true);
    });
}

export const updateLeads = (id, data, setRedirect = e => e) => (dispatch) => {
    return new Promise((resolve) => {
        api.updateLeads(id, data).then(res => {
            dispatch(currentLeads(res.data));
            dispatch(requestFail("User updated successfully, Go to user list."));
            setRedirect(true);
        }); 
    });
    
}


