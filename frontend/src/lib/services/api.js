import BaseApiClient from './BaseApiClient';
import config from './../../common/config';

const baseUrl = config.api.baseUrl;

class Api extends BaseApiClient {
    //auth api ------------------------------------------
    getAccessToken(credencials) {
        return this.post(`/auth/login`, credencials, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'default'
            }
        });
    }

    registerNewUser(data, type) {
        return this.post(`/auth/register`, {...data, type}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'default'
            }
        });
    }

    getLoggedUser() {
        return this.get(`/auth/me`);
    }

    // user api -------------------------------------------
    getUserById(id) {
        return this.get(`/user/${id}`);
    }

    getUserList(userId) {
        console.log("userIduserIduserId", userId);
        return this.post(`/user/list`, {userId});
    }

    updateUser(id, data) {
        return this.put(`/user/${id}`, data);
    }

    deleteUser(id) {
        return this.delete(`/user/${id}`);
    }

    // leads api ------------------------------------------
    getLeadsList() {
        return this.get(`/leads/list`);
    }

    newLeads(data) {
        return this.post(`/leads/create`, data);
    }

    updateLeads(id, data) {
        return this.put(`/leads/${id}`, data);
    }

    deleteLeads(id) {
        return this.delete(`/leads/${id}`);
    }
}

export default new Api(baseUrl);