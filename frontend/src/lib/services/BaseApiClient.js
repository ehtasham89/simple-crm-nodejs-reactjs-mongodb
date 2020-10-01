import axios from 'axios';
import authService from './auth';

const getClient = (baseUrl = null) => {

    const options = {
        baseURL: baseUrl
    };

    const client = axios.create(options);

    // request interceptor
    client.interceptors.request.use(
        requestConfig => {
            if (process.env.NODE_ENV === "development")
                console.log("API REQUEST DATA:", requestConfig);

            if (!requestConfig.headers['Authorization']) {
                requestConfig.headers['Authorization'] = `Bearer ${authService.getAccessToken()}`;
            } else if (requestConfig.headers['Authorization'] === 'default') {
                delete requestConfig.headers['Authorization'];
            }

            return requestConfig;
        },
        (requestError) => {
            // intercept errors here
            return Promise.reject(requestError);
        },
    );

    // response interceptor
    client.interceptors.response.use(
        response => response.data,
        error => {
            if (error.config && error.response && error.response.status === 401) {
                console.log("Your session has been expired!");
            } else {
                console.error(
                    'Error!',
                    (error.response && error.response.data && error.response.data.message) || "Server side error. Please contact to admin"
                );
                
                return process.env.NODE_ENV === "development" ? Promise.reject(error):Promise.reject(null);
            }

            //if (typeof error.response.data !== undefined) {
                //return Promise.reject(error.response.data)
            //}
        },
    );

    return client;
};

export default class BaseApiClient {
    constructor(baseUrl = null) {
        this.baseUrl = baseUrl;
        this.client = getClient(baseUrl);
    }

    get(url, conf = {}) {
        return this.client.get(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    delete(url, conf = {}) {
        return this.client.delete(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    head(url, conf = {}) {
        return this.client.head(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    options(url, conf = {}) {
        return this.client.options(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    post(url, data = {}, conf = {}) {
        return this.client.post(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => {console.log(error); return Promise.reject(error)} );
    }

    put(url, data = {}, conf = {}) {
        return this.client.put(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    patch(url, data = {}, conf = {}) {
        return this.client.patch(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }
}