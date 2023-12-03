import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { styled } from 'styled-components'

const LoaderStyle = styled.div`
    
     display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center; 
`

const Loader = () => {
    return (
        <LoaderStyle>
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#ffae33"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName="loader-center"
                visible={true}
            />
        </LoaderStyle>
    )
}

export default Loader