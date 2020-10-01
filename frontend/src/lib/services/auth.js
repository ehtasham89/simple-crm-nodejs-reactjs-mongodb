import {
    Redirect
  } from "react-router-dom";
import { AUTH_STORAGE_KEY, AUTH_USER_KEY } from './../../common/constants';


class AuthenticationService {

    tokenObject = null;
    authUser = null;

    isAuthenticated() {
        return this.tokenObject !== null;
    }

    getAccessToken() {
        if (this.tokenObject) {
            return this.tokenObject.accessToken;
        }

        return null;
    }

    saveToken(tokenObject) {
        this.tokenObject = tokenObject;

        localStorage.setItem(AUTH_STORAGE_KEY, tokenObject ? JSON.stringify(tokenObject):null);

        return Promise.resolve(null);
    }

    removeToken(redirect = false) {
        this.tokenObject = null;
        
        localStorage.removeItem(AUTH_STORAGE_KEY);

        if (redirect)
            Redirect("/auth/login");
        return Promise.resolve(null);
    }

    loadToken() {
        return new Promise((resolve, reject) => {
            localStorage.getItem(AUTH_STORAGE_KEY).then((tokenObject) => {
                if (tokenObject) {
                    this.tokenObject = JSON.parse(tokenObject);
                    
                    resolve(this.getAccessToken());
                }

                resolve(null);
            });
        });
    }

    loadAuthUser() {
        return new Promise((resolve, reject) => {
            localStorage.getItem(AUTH_USER_KEY).then((authUser) => {
                if (authUser) {
                    this.authUser = JSON.parse(authUser);
                    
                    resolve(this.getUserInfo());
                }

                resolve(null);
            });
        });
    }

    saveAuthUser(authUser) {
        this.authUser = authUser;
        console.log("authUser: ", authUser);

        return localStorage.setItem(AUTH_USER_KEY, authUser ? JSON.stringify(authUser):null);
    }

    removeAuthUser(redirect = false) {  
        this.authUser = null;

        localStorage.removeItem(AUTH_USER_KEY);

        return Promise.resolve(null);
    }

    getUserInfo() {
        if (this.authUser) {
            return this.authUser;
        }

        return null;
    }
}

export default new AuthenticationService();