import React, { useContext, useEffect, useState } from 'react'
import { Button, Checkbox, Container, Grid, TextField, Typography } from '@mui/material'
import { useGetAllBlogs } from '../../query-hooks/blogs/hooks';
import BlogCard from '../../components/blog-card';
import Loader from '../../components/loader';
import { BlogHeaderSection, FlexAlign, FlexContainer, FormControls, GlobalFilterStyle } from '../../styled-components';
import useDebounce from '../../hooks/useDebounce';
import { NavLink } from 'react-router-dom';
import Card from '../../components/blog-card/card';
import { highlightText } from '../../utils/common';
import styled from 'styled-components';
import { AuthContext } from '../../context';
import OutsideClickHandler from 'react-outside-click-handler';

// import Add from '@mui/icons-material/Add';
const LeftFilterContainer = styled.div`
    width: 100%;
    background: #ffffff;
    box-shadow: 1px 1px 8px 1px rgba(0,0,0,0.3);
    @media (max-width: 900px) {
    position: fixed;
    display: ${({ isFilterVisible }) => (isFilterVisible ? 'block' : 'none')};
    top: 160px;
    left: 0;
    z-index: 999;
    max-width: 200px;
    width: 100%;
  }
`
const FilterHeader = styled.div`
padding: 20px 10px;
color: #000;
border-bottom: 1px solid #f0f0f0;
${FlexContainer}
cursor: pointer;
font-size: 16px;
h4:last-child{
    color: #3474eb;
    &:hover{
        color: #0458a7;
    }
}
`

const FilterWrapper = styled.div`
padding: 20px 10px;

`
const FilterCheckBox = styled.div`
${FlexAlign}
font-size: 16px;
font-weight: 600;
text-transform: capitalize;
`
const FilterButton = styled.div`
  @media (min-width: 900px) {
    display: none;
  }
`;



const categoriesList = ["science", "code", "news", "technologies", "electronics",]

const BlogPage = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredBlogs, setFilteredBlog] = useState([]);
    const [checked, setChecked] = React.useState([]);
    const [categoryFilters, setCategoryFilters] = useState([]);
    const { debounceValue } = useDebounce(searchQuery, 500);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const { filterBlogs, handleFilterBlog } = useContext(AuthContext)

    const [noData, setNoData] = useState('There is no search data...');
    const { data: blogList, isLoading, isError, error, isSuccess } = useGetAllBlogs()

    const highlightText = (text, query) => {
        const parts = text?.split(new RegExp(`(${query})`, 'gi'));
        return (
            <span>
                {parts?.map((part, index) =>
                    part?.toLowerCase() === query?.toLowerCase() ? (
                        <span key={index} style={{ color: '#ffae33' }}>
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    // handleSearch
    const filterBlogList = (blog, debounceValue) => {
        if (debounceValue) {
            return blog.title.toLowerCase().includes(debounceValue.toLowerCase());
        }
        return true;
    };

    const filteredByCategory = (blog, filterBlogs) => {
        if (filterBlogs && filterBlogs.categories) {
            if (filterBlogs?.categories.length === 0) {
                return true;
            }
            return filterBlogs?.categories?.includes(blog?.category)
        }
        return true;
    }

    const handleClearAllFilterData = () => {
        setCategoryFilters([]);
        handleFilterBlog({ categories: [] })
    }

    // useEffect(() => {
    //     const filteredBlogs = filterBlogList(debounceValue, blogList);
    //     setFilteredBlog(filteredBlogs);
    // }, [debounceValue, blogList]);

    useEffect(() => {
        handleClearAllFilterData()
    }, [])

    const handleCategoryChange = (category) => {
        const updatedCategories = [...categoryFilters];
        if (updatedCategories.includes(category)) {
            const index = updatedCategories.indexOf(category);
            updatedCategories.splice(index, 1);

        } else {
            updatedCategories.push(category)
        }
        setCategoryFilters(updatedCategories);
        handleFilterBlog({ categories: updatedCategories })

    }

    if (isError) {
        return <h1>{error?.message}</h1>
    }
    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <Container>
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
                    <NavLink to="/blog">
                        <Button variant='contained' style={{ padding: '10px', marginBottom: '15px', width: '100%' }} >+ Create Blog</Button>
                    </NavLink>
                    <OutsideClickHandler onOutsideClick={() => setIsFilterVisible(false)}>
                        <FilterButton>
                            <Button variant='contained' onClick={() => setIsFilterVisible(!isFilterVisible)} style={{ padding: '10px', marginBottom: '15px' }} >Filter Blog</Button>
                        </FilterButton>
                    </OutsideClickHandler>
                </BlogHeaderSection>
                <h2 className='mb-10'>{debounceValue.length ? <>Result for : {debounceValue}</> : ''}</h2>
                <Grid container spacing={2}>
                    <Grid item lg={3} md={3} >
                        <div style={{ position: 'relative' }}>
                            <LeftFilterContainer isFilterVisible={isFilterVisible}>
                                <FilterHeader>
                                    <h4>Filter</h4>
                                    <h4 onClick={handleClearAllFilterData}>Clear All</h4>
                                </FilterHeader>
                                <FilterWrapper>
                                    <h4>Select Categories</h4>
                                    {
                                        categoriesList?.map((category, index) => (
                                            <FilterCheckBox key={index}>
                                                <Checkbox
                                                    checked={categoryFilters.includes(category)}
                                                    onChange={() => handleCategoryChange(category)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                /><span>{category}</span>
                                            </FilterCheckBox>
                                        ))
                                    }
                                </FilterWrapper>
                            </LeftFilterContainer>
                        </div>
                    </Grid>
                    <Grid item lg={8} md={8}>
                        {isSuccess && Array.isArray(blogList) && blogList.length > 0 ? (
                            blogList?.filter((item) => filteredByCategory(item, filterBlogs)
                            )?.filter((ele) => filterBlogList(ele, debounceValue))?.slice(0, itemsPerPage)?.map((blog) => (
                                <Card
                                    data={blog}
                                    query={searchQuery}
                                    key={blog?._id}
                                    blogLoading={isLoading}
                                    highlightText={highlightText}
                                />
                            ))
                        ) : (
                            <Typography variant="h5" style={{ color: 'black', margin: '10px auto' }}>
                                {noData}
                            </Typography>
                        )}
                        {blogList.length > itemsPerPage && (
                            <div className='t-center cursor-p my-3'>
                                <Button variant='outlined' onClick={() => setItemsPerPage(prev => prev + 10)}>View More</Button>
                            </div>
                        )}
                    </Grid>
                    <Grid item lg={1} md={1}>

                    </Grid>
                </Grid>
            </Container>

        </>
    )
}

export default BlogPage