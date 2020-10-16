import axios from 'axios';

axios.interceptors.request.use(config => {
    if (localStorage.getItem('token')) {
        config.headers.authorization= localStorage.getItem('token');
    }
    return config;
}, error => {
    return Promise.reject(error);
});
