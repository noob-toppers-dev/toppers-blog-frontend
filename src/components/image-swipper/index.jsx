import React from 'react'
import 'swiper/css';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HeroFeaturedSubTitle, HeroFeaturedTitle } from '../../styled-components';
const ImageSwipper = ({ slides }) => {
    const breakpoints = {
        // When window width is >= 320px
        320: {
            slidesPerView: 1,
        },
        // When window width is >= 480px
        480: {
            slidesPerView: 2,
        },
        // When window width is >= 768px
        768: {
            slidesPerView: 3,
        },
        // When window width is >= 1024px
        1024: {
            slidesPerView: 4,
        },
    };
    console.log(slides, "slidess")
    return (
        <Swiper
            spaceBetween={50}
            Autoplay={true}
            navigation
            breakpoints={breakpoints}
            slidesPerView={4}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {slides.map((slide, index) => (
                <SwiperSlide className='swiper-card' key={index}>
                    <HeroFeaturedTitle>{slide.title}</HeroFeaturedTitle>
                    <HeroFeaturedSubTitle>{slide.subtitle}</HeroFeaturedSubTitle>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default ImageSwipper