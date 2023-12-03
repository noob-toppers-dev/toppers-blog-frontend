
import axios from 'axios';

// Storing tokens
export const setTokens = (accessToken, refreshToken) => {
    sessionStorage.setItem('access-token', JSON.stringify(accessToken));
    sessionStorage.setItem('refresh-token', JSON.stringify(refreshToken));
};

export const setUserDetail = (user) => {
    sessionStorage.setItem('auth-user', JSON.stringify(user))
};
// export const setExpireTime = (expireTime) => {
//     sessionStorage.setItem('expiryTime', JSON.stringify(expireTime))
// };

export const getAccessToken = () => {
    const token = JSON.parse(sessionStorage.getItem('access-token'));
    return token;
};


export const getRefreshToken = () => {
    return localStorage.getItem('refresh-token');
};

export const getUserName = () => {
    const user = JSON.parse(sessionStorage.getItem('auth-user'));
    return user?.username;
};


export const clearTokens = () => {
    sessionStorage.removeItem('access-token')
    sessionStorage.removeItem('refresh-token')
    sessionStorage.removeItem('auth-user')
}



export const currentUserApp = () => {
    const user = JSON.parse(sessionStorage.getItem('auth-user'));
    return user
}

export const removeNumUser = (user) => {
    let username = ''
    for (let i = 0; i < user.length; i++) {
        if (isNaN(user[i])) {
            username += user[i]
        }
    }
    return username
}

export const findUserName = (name) => {
    return name?.substring(0, 2);
}

export const findPostDate = (date) => {
    return date?.substring(0, 10);
}

export const elipsisText = (str, maxLen) => {
    return str.length > maxLen ? str.substring(0, maxLen) + "..." : str;
}



// interceptor
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 10000,
});

const contentType1 = 'text/html'
const contentType2 = 'application/json'

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // Set Content-Type header based on request data
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        } else if (config.url.endsWith('forget-password')) {
            config.headers['Content-Type'] = contentType1;
        } else {
            config.headers['Content-Type'] = contentType2;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global error responses
        console.error('Axios interceptor error:', error);
        return Promise.reject(error);
    }
);


export default axiosInstance;

//another intercepter

// import axios from 'axios';

// import { API_PREFIX } from './config';

 

// const httpClient = axios.create({

//   baseURL: API_PREFIX,

//   headers: {'Content-Type': 'application/json'},

//   // withCredentials: true

// });

 

// httpClient.defaults.headers.common['Cache-Control'] = 'no-cache';

// httpClient.defaults.headers.common['Pragma'] = 'no-cache';

// httpClient.defaults.headers.common['Expires'] = -1;

// httpClient.defaults.headers.common['Access-Control-Allow-Origin']="*";

// httpClient.defaults.headers.common['Access-Control-Allow-Methods']="GET,PUT,POST,DELETE,PATCH,OPTIONS";

 

// httpClient.interceptors.request.use(function (config) {

//   const tokens = JSON.parse(localStorage.getItem('tokens'));

//   const user = localStorage.getItem('loggedInUser');

//   if(!config.headers['auth-token']){

//     config.headers['auth-token'] =  tokens?.authToken;

//   }

//   config.headers['user'] =  user;

//   return config;

// }, function(error){

//   return Promise.reject(error)

// });

 

// httpClient.interceptors.response.use(function(response){

//    return response

//   }, async function(error){

//       const prevRequest = error?.config;

//       if(error?.response.status === 401 && !prevRequest?.sent){

//         const tokens = JSON.parse(localStorage.getItem('tokens'));

//         prevRequest.sent = true;

//         const newAccessToken = await post(`/refresh-token`, {oldRefreshToken: tokens?.refreshToken});

//         console.log("res interceptor", newAccessToken)

//         prevRequest.headers['auth-token']=newAccessToken[0]?.authToken;

//         return httpClient(prevRequest);

//       }

//       return Promise.reject(error);

// })


