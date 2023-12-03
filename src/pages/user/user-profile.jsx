import { Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BlogCard from '../../components/blog-card';
import Loader from '../../components/loader';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getAllBlogQuery } from '../../query-hooks/blogs/api';
import UserProfileCard from '../../components/client-profile/user-profile-card';
import { currentUserApp } from '../../utils/axios/axios-interceptor';

const UserProfile = () => {
    const [blogs, setBlogs] = useState([])
    const currentUser = currentUserApp()
    const { data: userblogList, isLoading, isError, error, isSuccess } = useQuery('user-blogs', getAllBlogQuery, {
        // enabled: false,
        staleTime: 10000
    })


    if (isError) {
        return <h1>{error?.message}</h1>
    }
    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <UserProfileCard currentUser={currentUser} />
            <Container className='mt-10 mb-10' >
                <Grid container spacing={2} >
                    {
                        Array.isArray(userblogList) && userblogList.length > 0 && userblogList?.map((blog) => {
                            return (
                                currentUser?.username === blog?.username &&
                                <BlogCard data={blog} key={blog?._id} />
                            )
                        })}
                </Grid>
            </Container>
        </>

    )
}

export default UserProfile;


