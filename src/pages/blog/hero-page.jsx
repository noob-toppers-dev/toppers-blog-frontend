import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import FeaturedCard from '../../components/featured-card';
import { HeroFeaturedTitle } from '../../styled-components';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const HeroPageStyle = styled.div`
  padding: 20px;
  background: #111111;
  color: #e7e7e7 !important;
  height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const HeroCaption = styled.h1`
    font-size: 40px;
    margin: 10px;
    color: #e7e7e7;
    position: relative;
    .moving-line {
  position: absolute;
  height: 4px;
  bottom: 0px;
  width: 130px;
  border-radius: 6px;
  background: #fff;
  animation: moveLine 5s linear infinite;
}
@keyframes moveLine {
  0% {
    left: 0;
    background: linear-gradient(to right, gold, crimson, white);

  }
  50% {
    left: calc(100% - 130px);
  }
  100% {
    left: 0;
    background: linear-gradient(to right, white, crimson, gold);
  }
}

`;

const HeroFeaturedBoxStyle = styled.div`
    background: #fff;
    border-radius: 70px;
    padding:  20px;
    position: absolute;
    bottom: -20%;
    left: 7%;
    right: 7%;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    `;

const HeroFeaturedStyle = styled.div`
     display: flex;
  transition: transform 0.3s ease-in-out;
`;

const ArrowButton = styled.div`
        .prev-arrow{
            position: absolute;
            top: 50%;
            transform: translate(20px,-50%);
            left: 20px;
        }
        .next-arrow{
            position: absolute;
            top: 50%;
            transform: translate(-20px,-50%);
            right: 20px;
        }
    `

const featuredItems = [
    {
        id: 1,
        title: 'Create Blogs',
        subtitle: 'You can create your own blogs!',
    },
    {
        id: 2,
        title: 'Update Blogs',
        subtitle: 'You can update your own blogs!',
    },
    {
        id: 3,
        title: 'Save Blogs',
        subtitle: 'You can save any blogs!',
    },
    {
        id: 4,
        title: 'Like & dislike Blogs',
        subtitle: 'You can like and dislike any blogs!',
    },
    {
        id: 5,
        title: 'Follow & Unfollow',
        subtitle: 'You can follow any users!',
    },
];
const HeroPage = () => {


    const [currentIndex, setCurrentIndex] = useState(0);

    const showCards = () => {
        return featuredItems.slice(currentIndex, currentIndex + 3).map((item) => (
            <div key={item.id} className="slider-card">
                <h2>{item.title}</h2>
                <p>{item.subtitle}</p>
            </div>
        ));
    };

    // const nextSlide = () => {
    //     if (currentIndex < featuredItems.length) {
    //         setCurrentIndex(currentIndex + 1);
    //     }
    // };

    // const prevSlide = () => {
    //     if (currentIndex > 0) {
    //         setCurrentIndex(currentIndex - 1);
    //     }
    // };
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredItems.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredItems.length) % featuredItems.length);
    };



    return (
        <HeroPageStyle>
            <HeroCaption>
                Let's Create your new blog on Zee<span className='dot'>.</span>blog !!
                <div class="moving-line"></div>
            </HeroCaption>
            <HeroFeaturedBoxStyle itemLen={currentIndex}>
                <HeroFeaturedStyle itemLen={currentIndex} >
                    {featuredItems?.map(item => (
                        <FeaturedCard item={item} itemLen={currentIndex} />
                    ))}
                    <ArrowButton>
                        <ArrowBackIosIcon onClick={prevSlide} className='prev-arrow' />
                        <ArrowForwardIosIcon onClick={nextSlide} className='next-arrow' />
                    </ArrowButton>
                </HeroFeaturedStyle>
            </HeroFeaturedBoxStyle>
        </HeroPageStyle>
    )


};
export default HeroPage;


// const updateVisibleCards = () => {
//     const screenWidth = window.innerWidth;
//     if (screenWidth <= 500) {
//         setVisibleCards(1);
//     } else if (screenWidth == 800 || screenWidth <= 900) {
//         setVisibleCards(3);
//     } else if (screenWidth <= 1224) {
//         setVisibleCards(4);
//     } else {
//         setVisibleCards(5);
//     }
// };

// useEffect(() => {
//     updateVisibleCards();
//     window.addEventListener('resize', updateVisibleCards);
//     return () => {
//         window.removeEventListener('resize', updateVisibleCards);
//     };
// }, [currentIndex, updateVisibleCards]);