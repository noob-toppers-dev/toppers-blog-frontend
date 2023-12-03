import React from 'react'
import { styled, Box, Typography } from "@mui/material"
import { useGetAllBlogs } from '../../query-hooks/blogs/hooks';
import Sliders from '../imge-slider/slider';

const ImageStyle = styled(Box)`
position: relative;
    width: 100%;
    background: #000;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;  
&::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.23);
}
`;

const Heading = styled(Typography)`
    font-size: 60px;
    color: #ffffff;
    line-height: 1
`;

const SubHeading = styled(Typography)`
    font-size: 32px;
    color: #ffffff;
`;

const Banner = () => {
    const { data: blogList } = useGetAllBlogs();
    const auth = sessionStorage.getItem('access-token');

    return (
        <>
            {auth ?
                <Sliders data={blogList} />
                :
                <ImageStyle>
                    <Heading>{`Let’s work together on your next web project`}</Heading>
                    <SubHeading>Trending Blogs</SubHeading>
                </ImageStyle>
            }
        </>
    )
}
export default Banner