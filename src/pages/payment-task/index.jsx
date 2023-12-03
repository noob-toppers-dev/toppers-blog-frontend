import React from 'react'
import styled from 'styled-components';
import PaymentCard from './payment-card';


const AppWrapper = styled.div` 
  padding: 20px;
  margin: 10px auto;
`;



const cardData = [
    {
        id: 1, type: '1 Pair', title: 'DKK 195.00', offPrice: '50% OFF', offerType: ''
    },
    {
        id: 2, type: '2 Pair', title: 'DKK 345.00', offPrice: '40% OFF', offerType: 'Most Popular'
    },
    {
        id: 3, type: '3 Pair', title: 'DKK 528.00', offPrice: '60% OFF', offerType: ''
    }
]


const PaymentTask = () => {

    return (
        <AppWrapper>
            <PaymentCard data={cardData} />
        </AppWrapper>
    );

}

export default PaymentTask;

