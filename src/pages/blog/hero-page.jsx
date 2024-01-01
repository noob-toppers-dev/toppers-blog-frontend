import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import FeaturedCard from '../../components/featured-card';


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

const HeroFeaturedStyle = styled.div`
    background: #fff;
    border-radius: 70px;
    padding: 10px 20px;
    position: absolute;
    bottom: -20%;
    left: 7%;
    right: 7%;
    height: 160px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    overflow: hidden;
  @media (max-width: 500px) {
    flex-wrap: nowrap;
    padding: ${({ itemLen }) => itemLen < 2 && `5px`};
    height: ${({ itemLen }) => itemLen < 2 && `120px`};
    bottom: ${({ itemLen }) => itemLen < 2 && `-15%`};
    justify-content: space-between;
  }
    `;

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
    const [visibleCards, setVisibleCards] = useState(featuredItems.length);


    const updateVisibleCards = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 500) {
            setVisibleCards(1);
        } else if (screenWidth == 800 || screenWidth <= 900) {
            setVisibleCards(3);
        } else if (screenWidth <= 1224) {
            setVisibleCards(4);
        } else {
            setVisibleCards(5);
        }
    };

    useEffect(() => {
        updateVisibleCards();
        window.addEventListener('resize', updateVisibleCards);
        return () => {
            window.removeEventListener('resize', updateVisibleCards);
        };
    }, [visibleCards, updateVisibleCards]);

    return (
        <HeroPageStyle>
            <HeroCaption>
                Let's Create your new blog on Zee<span className='dot'>.</span>blog !!
                <div class="moving-line"></div>
            </HeroCaption>
            <HeroFeaturedStyle itemLen={visibleCards}>
                {featuredItems.slice(0, visibleCards).map(item => (
                    <FeaturedCard item={item} itemLen={visibleCards} />
                ))}
            </HeroFeaturedStyle>
        </HeroPageStyle>
    )
}

export default HeroPage