import React from 'react'
import { HeroFeaturedCard, HeroFeaturedSubTitle, HeroFeaturedTitle } from '../../styled-components'

const FeaturedCard = ({ item, itemLen }) => {
    return (
        <HeroFeaturedCard itemLen={itemLen} key={item.id}>
            <HeroFeaturedTitle>{item.title}</HeroFeaturedTitle>
            <HeroFeaturedSubTitle>{item.subtitle}</HeroFeaturedSubTitle>
        </HeroFeaturedCard>
    )
}

export default FeaturedCard