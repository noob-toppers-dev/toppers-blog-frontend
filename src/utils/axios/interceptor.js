import axios from 'axios';
const API_PREFIX = 'http://localhost:8000/api/'

const axiosInstance = axios.create({

    baseURL: API_PREFIX,

    headers: { 'Content-Type': 'application/json' },

    // withCredentials: true

});



axiosInstance.defaults.headers.common['Cache-Control'] = 'no-cache';

axiosInstance.defaults.headers.common['Pragma'] = 'no-cache';

axiosInstance.defaults.headers.common['Expires'] = -1;

axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = "*";

axiosInstance.defaults.headers.common['Access-Control-Allow-Methods'] = "GET,PUT,POST,DELETE,PATCH,OPTIONS";



axiosInstance.interceptors.request.use(function (config) {

    const tokens = JSON.parse(localStorage.getItem('access-token'));
    console.log(tokens, "req-token")

    const user = localStorage.getItem('auth-user');
    console.log(user, "user")

    if (!config.headers['auth-token']) {

        config.headers['auth-token'] = tokens?.authToken;

    }

    config.headers['user'] = user;

    return config;

}, function (error) {

    return Promise.reject(error)

});



axiosInstance.interceptors.response.use(function (response) {

    return response

}, async function (error) {

    const prevRequest = error?.config;

    if (error?.response.status === 401 && !prevRequest?.sent) {

        const tokens = JSON.parse(localStorage.getItem('access-token'));
        console.log(tokens, "res-token")

        prevRequest.sent = true;

        const newAccessToken = await axiosInstance.post(`/refresh-token`, { oldRefreshToken: tokens?.refreshToken });

        console.log("res interceptor newAccessT", newAccessToken)

        prevRequest.headers['auth-token'] = newAccessToken[0]?.authToken;

        return axiosInstance(prevRequest);

    }

    return Promise.reject(error);

})

export default axiosInstance;
