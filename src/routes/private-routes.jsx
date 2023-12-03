
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = ({ isAuth }) => {
    const auth = sessionStorage.getItem('access-token');
    return auth ?
        <>
            <Outlet />
        </>
        :
        <Navigate replace to="/" />
}

export default PrivateRoutes