import React, { useEffect, useState } from 'react'
import { BlogHeaderSection, GlobalFilterStyle, HomeInnerStyle, HomeWrapperStyle } from '../../styled-components'
import Banner from '../../components/banner'
import BlogPage from '../../pages/blog'
import { useGetAllBlogs } from '../../query-hooks/blogs/hooks'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import Card from '../../components/blog-card/card'
import Loader from '../../components/loader'
import { highlightText } from '../../utils/common'
import useDebounce from '../../hooks/useDebounce'
import { NavLink } from 'react-router-dom'

const MainPage = () => {
    const { data: blogList, isLoading, isError, error, isSuccess } = useGetAllBlogs();
    const [noData, setNoData] = useState('There is no search data...');
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredBlogs, setFilteredBlog] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const { debounceValue } = useDebounce(searchQuery, 500)

    // handleSearch
    const filterBlogList = (debounceValue, blogList) => {
        if (!Array.isArray(blogList)) {
            return [];
        }
        return blogList?.filter((blog) => {
            if (blog) {
                return (
                    blog.title.toLowerCase().includes(debounceValue) ||
                    blog.description.toLowerCase().includes(debounceValue)
                )
            }
        });
    };

    useEffect(() => {
        const filteredBlogs = filterBlogList(debounceValue, blogList);
        setFilteredBlog(filteredBlogs);
    }, [debounceValue, blogList]);

    if (isError) {
        return <h1>{error?.message}</h1>
    }

    if (isLoading) {
        return <Loader />
    }
    // without loggin
    return (
        <HomeWrapperStyle>
            <Banner />
            <Container>

            </Container>
            <Grid container spacing={2} className='pt-15'>
                <Grid item lg={3} md={3} ></Grid>
                <Grid item lg={8} md={8} >
                    <BlogHeaderSection>
                        <GlobalFilterStyle>
                            <TextField
                                style={{ width: '100%' }}
                                id="standard-search"
                                label="Search here..."
                                type="search"
                                variant="standard"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </GlobalFilterStyle>
                        <NavLink to="/login">
                            <Button variant='contained' size="large" style={{ padding: '10px', marginBottom: '15px' }} >+ Create Blog</Button>
                        </NavLink>

                    </BlogHeaderSection>
                    <h2 className='mb-10'>{searchQuery.length ? <>Result for : {searchQuery}</> : ''}</h2>
                    {
                        isSuccess && Array.isArray(filteredBlogs) && filteredBlogs?.length > 0 ? (
                            filteredBlogs?.slice(0, itemsPerPage).map((blog) => (
                                <Card data={blog} key={blog?._id} blogLoading={isLoading} query={searchQuery} highlightText={highlightText} />
                            ))
                        ) : (
                            <Typography variant="h5" style={{ color: 'black', margin: '10px auto' }}>
                                {noData}
                            </Typography>
                        )}
                    {filteredBlogs.length > itemsPerPage && (
                        <div className='t-center cursor-p my-3'>
                            <Button onClick={() => setItemsPerPage(prev => prev + 10)}>View More</Button>
                        </div>
                    )}
                </Grid>
                <Grid item lg={1} md={1} ></Grid>

            </Grid>
        </HomeWrapperStyle >
    )
}

export default MainPage