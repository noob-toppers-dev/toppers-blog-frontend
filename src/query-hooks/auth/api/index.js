// import axiosInstance from "../../../utils/axios/axios-interceptor";

import axiosInstance from "../../../utils/axios/interceptor";

export const forgetPasswordMutation = async (email) => {
    console.log(email)
    const resp = await axiosInstance.post('auth/forget-password', email);
    return resp.data;
}



export const registerUser = async (userData) => {
    const resp = await axiosInstance.post('auth/register', userData);
    return resp;
}
export const loginUser = async (userData) => {
    const resp = await axiosInstance.post('auth/login', userData);
    return resp;
}


export const logoutUser = async () => {
    await axiosInstance.post('auth/logout')
    sessionStorage.removeItem('refresh-token')
    sessionStorage.removeItem('access-token')
    sessionStorage.removeItem('auth-user')
}