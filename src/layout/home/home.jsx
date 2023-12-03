import React from 'react'
import { HomeInnerStyle, HomeWrapperStyle } from '../../styled-components';

import Banner from '../../components/banner';

import BlogPage from '../../pages/blog';
const Home = () => {



    return (
        <HomeWrapperStyle>
            <Banner />
            <HomeInnerStyle>
                <BlogPage />
            </HomeInnerStyle>
        </HomeWrapperStyle>
    )
}

export default Home;

