import React from 'react'
import { Circles } from 'react-loader-spinner'
import styled from 'styled-components'

const CirclesStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const ButtonLoader = ({ title }) => {
    return (
        <CirclesStyle>
            <Circles
                height="40"
                width="40"
                color="white"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            <span>{title}</span>
        </CirclesStyle>
    )
}

export default ButtonLoader