import React, { useState } from 'react';
import { css, styled } from 'styled-components';

export const FlexContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FlexAlign = css`
  display: flex;
  align-items: center;
`;
const CardWrapper = styled.div`
    border: 2px solid ${props => (props.active ? '#0ba57a' : '#ccc')};
    max-width: 400px;
    width: 100%;
    margin-bottom: 10px;
    border-radius: 5px;
`;


const CardHeader = styled.div`
  ${FlexContainer}
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${props => (props.active ? '#0eaf3226' : 'white')};
`;

const CardContent = styled.div`
  display: ${props => (props.active ? 'block' : 'none')};
  background: ${props => (props.active ? '#0eaf3118' : 'white')};
  padding: 10px;
`;

const LeftSideContent = styled.div`
    ${FlexAlign}
`
const LeftSideText = styled.div`
    margin-left: 10px;
    `
const RightSideContent = styled.div`
h5{
    font-weight: 700;
    color: #048050;
}
    `;

const AccordionContent = styled.div`
padding: 10px;
`;

const BodyDetail = styled.div`
  ${FlexContainer}
  max-width: 160px;
`

const SelectDropDown = styled.select`
    margin: 15px 5px 0px;
    width: 100%;
    padding:5px;
`
const ColorDropDown = styled.div`
    margin: 0px 5px;
`
const SizeDropDown = styled.div`
h4{
    margin-left: 8px;
}
`
const DisplayContainer = styled.div`
max-width: 400px;
    position: relative;
`
const DisplayContent = styled.div`
${FlexContainer}
h5{
 color   :#048050;
}
`
const PaymentButton = styled.button`
 background   :#048050;
 color: #fff;
 font-size: 18px;
 padding: 10px;
 outline: none;
 border-radius: 3px;
 margin-top: 20px;
 width: 100%;

`
const CopyRightMsg = styled.span`
 position: absolute;
 right: 0;
 top: 108%;
 font-style: italic;
`

const PaymentCard = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(1);


    const toggleCard = (cardId) => {
        setActiveIndex(activeIndex === cardId ? null : cardId);
    };

    const handleCard = (e) => {
        const val = e.target.value;
        //write here our logic 
    }

    return (
        <>
            {data?.map((ele) => (
                <CardWrapper key={ele?.id} active={activeIndex === ele.id}>
                    <CardHeader active={activeIndex === ele.id} onClick={() => toggleCard(ele?.id)}>
                        <LeftSideContent>
                            <input type="radio" id="cardId" checked={activeIndex === ele.id} onChange={handleCard} />
                            <LeftSideText>
                                <h4>{ele?.type}</h4>
                                <p>{ele?.title}</p>
                            </LeftSideText>
                        </LeftSideContent>
                        <RightSideContent>
                            <h5>{ele?.offerType}</h5>
                            <h4>{ele?.offPrice}</h4>
                        </RightSideContent>
                    </CardHeader>
                    <CardContent active={activeIndex === ele.id}>
                        <AccordionContent>
                            <BodyDetail>
                                <SizeDropDown>
                                    <h4>Size</h4>
                                    <SelectDropDown>
                                        <option value="$">$</option>
                                        <option value="$100">$100</option>
                                        <option value="$300">$300</option>
                                    </SelectDropDown>
                                    <SelectDropDown>
                                        <option value="$">$</option>
                                        <option value="$100">$100</option>
                                        <option value="$300">$300</option>
                                    </SelectDropDown>
                                </SizeDropDown>
                                <ColorDropDown>
                                    <h4>Color</h4>
                                    <SelectDropDown>
                                        <option value="color">Choose Color</option>
                                        <option value="red">Red</option>
                                        <option value="blue">Blue</option>
                                    </SelectDropDown>
                                    <SelectDropDown>
                                        <option value="color">Choose Color</option>
                                        <option value="red">Red</option>
                                        <option value="blue">Blue</option>
                                    </SelectDropDown>
                                </ColorDropDown>
                            </BodyDetail>
                        </AccordionContent>

                    </CardContent>
                </CardWrapper>
            ))}
            <DisplayContainer>
                <DisplayContent>
                    <h5>Free 2 days shipping</h5>
                    <h4>Total : DKK 360.00</h4>
                </DisplayContent>
                <PaymentButton>+ Add to Cart</PaymentButton>
                <CopyRightMsg>&copy; Powered by Pumper</CopyRightMsg>
            </DisplayContainer>
        </>
    );
};

export default PaymentCard;
