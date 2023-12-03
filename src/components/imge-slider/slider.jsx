import React from 'react';
import Wrapper from './wrapper';
import Title from './title';
import Subtitle from './sub-title';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { elipsisText } from '../../utils/axios/axios-interceptor';
import { useNavigate } from 'react-router-dom';

const ImageBox = styled.div`
    height: 330px;
    position: relative;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const WrapperContainer = styled.div`
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -45%);
    background: #ffffff42;
    border: 1px solid #f0f0f0;
    border-radius: 10px;
    padding: 10px 15px;
`;

const Sliders = ({ data }) => {
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Initially display 4 cards for large screens
        slidesToScroll: 1,
        fade: true,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3, // Display 3 cards for medium screens
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2, // Display 2 cards for small screens
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1, // Display 1 card for mobile screens
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            {data?.slice(Math.max(data.length - 5, 1))?.map((blog) => (
                <div key={blog._id} className="mb-10">
                    <ImageBox onClick={() => navigate(`/blog-detail-page/${blog?._id}`)}>
                        <img src={blog?.picture} alt={blog?.title} />
                        <WrapperContainer>
                            <Wrapper>
                                <Title>{blog?.title}</Title>
                                <Subtitle>
                                    {elipsisText(blog?.description, 70)}
                                </Subtitle>
                            </Wrapper>
                        </WrapperContainer>
                    </ImageBox>
                </div>
            ))}
        </Slider>
    );
};

export default Sliders;
