import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/auth/register'
import Login from '../pages/auth/login'
import Home from '../layout/home/home'
import PrivateRoutes from './private-routes'
import CreateBlog from '../pages/blog/create'
import BlogDetailPage from '../pages/blog/blog-detail-page'
import UpdateBlog from '../pages/blog/update'
import UserProfile from '../pages/user/user-profile'
import PaymentTask from '../pages/payment-task'
import ForgetPassword from '../pages/auth/forget-password'
import SavedBlogs from '../pages/saved-blogs'
import MainPage from '../layout/home'

const Routing = () => {
    const [isAuth, setIsAuth] = useState(false);
    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path='/' element={<PrivateRoutes isAuth={isAuth} />}>
                <Route path='/welcome-page' element={<Home />} />
                <Route path='/saved-blogs' element={<SavedBlogs />} />
                <Route path='/user-profile' element={<UserProfile />} />
                <Route path='/blog' element={<CreateBlog />} />
                <Route path='/payment' element={<PaymentTask />} />
                <Route path='/update-blog/:id' element={<UpdateBlog />} />
                <Route path='/blog-detail-page/:id' element={<BlogDetailPage />} />
            </Route>
        </Routes>
    )
}

export default Routing